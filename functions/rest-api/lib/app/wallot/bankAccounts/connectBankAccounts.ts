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

export const connectBankAccounts = async (
	{ stripe_financial_connections_account_ids }: ConnectBankAccountsParams,
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

	// Save the first account ID for the default payment method
	const firstAccountId = stripe_financial_connections_account_ids[0];
	if (firstAccountId == null) {
		throw new Error('No financial connections account IDs provided');
	}

	// Create an object mapping from the financial connections account ID to the payment method ID
	const paymentMethodDataByAccountId: Record<
		string,
		{ description: string; id: string; name: string }
	> = {};

	// Get all the PaymentMethods that already exist
	const stripeCustomerPaymentMethods =
		await stripe.customers.listPaymentMethods(stripe_customer_id, {
			limit: 99,
		});
	const attachedPaymentMethodsWithBankAccount =
		stripeCustomerPaymentMethods.data
			.map(({ id, us_bank_account }) =>
				us_bank_account?.financial_connections_account
					? {
							paymentMethodData: {
								description: us_bank_account?.account_type ?? 'Account',
								id,
								name: us_bank_account?.last4 ?? '****',
							},
							financialConnectionsAccountId:
								us_bank_account?.financial_connections_account,
					  }
					: null,
			)
			.filter((data): data is Exclude<typeof data, null> => !!data);
	log({
		message: 'Attached PaymentMethods with BankAccounts',
		stripeCustomerPaymentMethods,
		attachedPaymentMethodsWithBankAccount,
	});

	// For each existing PaymentMethod, add it to the mapping
	for (const {
		paymentMethodData,
		financialConnectionsAccountId,
	} of attachedPaymentMethodsWithBankAccount) {
		paymentMethodDataByAccountId[financialConnectionsAccountId] =
			paymentMethodData;
	}
	log({
		message: 'PaymentMethod data by Account ID at step 1',
		paymentMethodDataByAccountId,
	});

	// Create a list of the account IDs that are not already attached to the customer
	const unlinkedAccountIds = stripe_financial_connections_account_ids.filter(
		(id) => !paymentMethodDataByAccountId[id],
	);
	log({
		message: 'Unlinked account IDs',
		unlinkedAccountIds,
	});

	for (const unlinkedAccountId of unlinkedAccountIds) {
		try {
			// Create a PaymentMethod directly from the financial connections account
			const paymentMethod = await stripe.paymentMethods.create({
				type: 'us_bank_account',
				us_bank_account: {
					financial_connections_account: unlinkedAccountId,
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
			paymentMethodDataByAccountId[unlinkedAccountId] = {
				description: paymentMethod.us_bank_account?.account_type ?? 'Account',
				id: paymentMethod.id,
				name: paymentMethod.us_bank_account?.last4 ?? '****',
			};
		} catch (error) {
			// Log the error and continue with the next iteration
			log({
				message: 'Error processing unlinkedAccountId',
				error,
				unlinkedAccountId,
			});
		}
	}
	log({
		message: 'PaymentMethod data by Account ID at step 2',
		paymentMethodDataByAccountId,
	});

	// Create a batch
	const batch = db.batch();

	// Initialize the default payment method ID
	let defaultBankAccountId: string | undefined;

	for (const [accountId, paymentMethodData] of Object.entries(
		paymentMethodDataByAccountId,
	)) {
		// Create a BankAccount
		const bankAccountParams: CreateBankAccountParams = {
			user: user._id,
			description: paymentMethodData.description,
			name: paymentMethodData.name,
			category: 'default',
			stripe_financial_connections_account_id: accountId,
			stripe_payment_method_id: paymentMethodData.id,
		};
		const bankAccount: BankAccount = bankAccountsApi.mergeCreateParams({
			createParams: bankAccountParams,
		});
		// Set the default payment method ID
		if (accountId === firstAccountId) {
			defaultBankAccountId = bankAccount._id;
		}
		// Add the BankAccount to the batch
		const bankAccountsCollectionId = bankAccountsApi.collectionId;
		const bankAccountDoc = db.collection(bankAccountsCollectionId).doc();
		batch.set(bankAccountDoc, bankAccount);
	}
	log({
		message: 'Default bank account ID',
		defaultBankAccountId,
	});

	// Add the USER update operation to the batch
	if (defaultBankAccountId == null) {
		throw new Error('No default bank account ID was set');
	}
	const updateUserParams: UpdateUserParams = {
		default_bank_account: defaultBankAccountId,
	};
	const userDoc = db.collection(usersCollectionId).doc(user._id);
	batch.update(userDoc, updateUserParams);

	// Commit the batch
	await batch.commit();

	// Return
	return { json: {} };
};
