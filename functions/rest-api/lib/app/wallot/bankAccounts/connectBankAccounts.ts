import { Stripe } from 'stripe';
import { type DecodedIdToken as FirebaseUser } from 'firebase-admin/auth';
import { FunctionResponse } from '@wallot/node';
import {
	BankAccount,
	bankAccountsApi,
	ConnectBankAccountsParams,
	ConnectBankAccountsResponse,
	CreateBankAccountParams,
	UpdateUserParams,
	User,
	usersApi,
} from '@wallot/js';
import { db, log, stripe } from '../../../services.js';

type BankAccountSourceData = {
	account: Stripe.FinancialConnections.Account;
	paymentMethod: Stripe.PaymentMethod | null;
};
type BankAccountSourceDataAttached = {
	account: Stripe.FinancialConnections.Account;
	paymentMethod: Stripe.PaymentMethod;
};

export const connectBankAccounts = async (
	{
		stripe_financial_connections_accounts: stripeFinancialConnectionsAccounts,
	}: ConnectBankAccountsParams<Stripe.FinancialConnections.Account>,
	_params: Record<string, never>,
	_query: Record<string, never>,
	firebaseUser: FirebaseUser | null,
): Promise<FunctionResponse<ConnectBankAccountsResponse>> => {
	if (!firebaseUser) throw new Error('Unauthorized');

	// Locate USER by Firebase UID
	const usersCollectionId = usersApi.collectionId;
	const user = (
		await db.collection(usersCollectionId).doc(firebaseUser.uid).get()
	).data() as User;
	const { stripe_customer_id } = user;

	// Get all the PaymentMethods derived from a bank account that already exist
	const stripeCustomerPaymentMethods =
		await stripe.customers.listPaymentMethods(stripe_customer_id, {
			limit: 99,
		});

	// Create a mapping of source data by Account ID
	let highestBalanceSoFar = 0;
	let accountIdWithHighestBalance: string | null = null;
	const sourceDataByAccountId = stripeFinancialConnectionsAccounts.reduce(
		(acc, stripeFinancialConnectionsAccount) => {
			if (stripeFinancialConnectionsAccount.status !== 'active') {
				return acc;
			}
			if (
				!stripeFinancialConnectionsAccount.supported_payment_method_types.includes(
					'us_bank_account',
				)
			) {
				return acc;
			}

			const balance = stripeFinancialConnectionsAccount.balance;
			if (balance != null) {
				/**
				 * The funds available to the account holder. Typically this is the current balance less any holds.
				 * Each key is a three-letter ISO currency code, in lowercase.
				 * Each value is a integer amount. A positive amount indicates money owed to the account holder. A negative amount indicates money owed by the account holder.
				 */
				const balanceAmount = balance.cash?.available;
				const usdBalance = balanceAmount?.usd ?? balanceAmount?.USD ?? 0;
				if (usdBalance > highestBalanceSoFar) {
					highestBalanceSoFar = usdBalance;
					accountIdWithHighestBalance = stripeFinancialConnectionsAccount.id;
				}
			}

			const matchingPaymentMethod = stripeCustomerPaymentMethods.data.find(
				(paymentMethod) => {
					return (
						paymentMethod.us_bank_account?.financial_connections_account ===
						stripeFinancialConnectionsAccount.id
					);
				},
			);
			acc[stripeFinancialConnectionsAccount.id] = {
				account: stripeFinancialConnectionsAccount,
				paymentMethod: matchingPaymentMethod ?? null,
			};
			return acc;
		},
		{} as Record<string, BankAccountSourceData>,
	);
	log({
		message: 'Bank account source data',
		stripeCustomerPaymentMethods,
		sourceDataByAccountId,
	});

	// If the source data is empty, there was a problem with the source data
	if (Object.keys(sourceDataByAccountId).length === 0) {
		throw new Error('No bank accounts were successfully connected');
	}

	const unlinkedAccountIds = Object.keys(sourceDataByAccountId).filter(
		(accountId) => sourceDataByAccountId[accountId]?.paymentMethod == null,
	);

	for (const unlinkedAccountId of unlinkedAccountIds) {
		try {
			const sourceData = sourceDataByAccountId[unlinkedAccountId];
			if (!sourceData) {
				throw new Error('Account not found');
			}

			const userFullName = (
				(user.alpaca_account_identity?.given_name ?? '') +
				' ' +
				(user.alpaca_account_identity?.family_name ?? '')
			).trim();

			// Create a PaymentMethod directly from the financial connections account
			const paymentMethod = await stripe.paymentMethods.create({
				type: 'us_bank_account',
				us_bank_account: {
					financial_connections_account: unlinkedAccountId,
				},
				billing_details: {
					email: user.firebase_auth_email,
					name: userFullName || user.username,
				},
			});
			log({
				message:
					'PaymentMethod created from array loop over unlinked account IDs',
				paymentMethod,
				unlinkedAccountId,
			});

			// Attach the newly created PaymentMethod to the Stripe customer
			const attachedPaymentMethod = await stripe.paymentMethods.attach(
				paymentMethod.id,
				{
					customer: stripe_customer_id,
				},
			);
			log({
				message:
					'PaymentMethod attached to Stripe customer from array loop over unlinked account IDs',
				attachedPaymentMethod,
				unlinkedAccountId,
			});

			// Add the new PaymentMethod to the mapping
			sourceDataByAccountId[unlinkedAccountId] = {
				...sourceData,
				paymentMethod: attachedPaymentMethod,
			};
		} catch (error) {
			// Log the error and continue with the next iteration
			log({
				message: 'Error processing unlinkedAccountId',
				error,
				unlinkedAccountId,
			});

			// Remove the unlinked account ID from the source data
			delete sourceDataByAccountId[unlinkedAccountId];
		}
	}
	log({
		message: 'Bank account source data after processing unlinked accounts',
		bankAccountSourceData: sourceDataByAccountId,
	});

	// Create a batch
	const batch = db.batch();

	// Initialize the default payment method ID
	let defaultBankAccountId: string | undefined;
	let defaultPaymentMethodId: string | undefined;

	// Type cast
	const attachedSourceDataByAccountId = sourceDataByAccountId as Record<
		string,
		BankAccountSourceDataAttached
	>;

	// If the object is empty, there was a problem with the source data
	if (Object.keys(attachedSourceDataByAccountId).length === 0) {
		throw new Error('No bank accounts were successfully connected');
	}

	// Loop over the source data and create BankAccounts
	for (const { account, paymentMethod } of Object.values(
		attachedSourceDataByAccountId,
	)) {
		// Create a BankAccount
		const bankAccountParams: CreateBankAccountParams = {
			user: user._id,
			name: account.display_name ?? account.last4 ?? 'Bank Account',
			category: 'default',
			institution_name: account.institution_name,
			routing_number: paymentMethod.us_bank_account?.routing_number ?? null,
			stripe_financial_connections_account_id: account.id,
			stripe_payment_method_id: paymentMethod.id,
		};
		const bankAccount: BankAccount = bankAccountsApi.mergeCreateParams({
			createParams: bankAccountParams,
		});
		// Set the default payment method ID
		if (accountIdWithHighestBalance == null) {
			if (defaultBankAccountId == null) {
				defaultBankAccountId = bankAccount._id;
				defaultPaymentMethodId = paymentMethod.id;
			}
		} else if (account.id === accountIdWithHighestBalance) {
			defaultBankAccountId = bankAccount._id;
			defaultPaymentMethodId = paymentMethod.id;
		}
		// Add the BankAccount to the batch
		const bankAccountsCollectionId = bankAccountsApi.collectionId;
		const bankAccountDoc = db
			.collection(bankAccountsCollectionId)
			.doc(bankAccount._id);
		batch.set(bankAccountDoc, bankAccount);

		// Log the BankAccount
		log({
			message: 'Bank account created with _id ' + bankAccount._id,
			bankAccount,
		});
	}
	log({
		message: 'Default bank account ID',
		defaultBankAccountId,
	});

	// Add the USER update operation to the batch
	if (defaultBankAccountId == null) {
		throw new Error('No default bank account ID was set');
	}
	if (defaultPaymentMethodId == null) {
		throw new Error('No default payment method ID was set');
	}
	const updateUserParams: UpdateUserParams = {
		default_bank_account: defaultBankAccountId,
	};
	const userDoc = db.collection(usersCollectionId).doc(user._id);
	batch.update(userDoc, updateUserParams);

	// Commit the batch
	await batch.commit();

	// Return
	return {
		json: {},
		onFinished: async () => {
			// Set default payment method
			await stripe.customers.update(stripe_customer_id, {
				invoice_settings: {
					default_payment_method: defaultPaymentMethodId,
				},
			});
		},
	};
};
