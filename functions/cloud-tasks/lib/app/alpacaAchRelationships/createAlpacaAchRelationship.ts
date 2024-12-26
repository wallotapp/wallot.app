import { CloudTaskHandler } from 'ergonomic-node';
import {
	AlpacaAchRelationship,
	UserActivatedByAlpaca,
	TokenizedBankAccount,
	bankAccountsApi,
	BankAccount,
	isBankAccountPendingAlpacaAchRelationship,
	isBankAccountTokenized,
	usersApi,
	User,
	isUserActivatedByAlpaca,
	UpdateBankAccountParams,
	getBankAccountPropertiesFromAlpacaAchRelationship,
} from '@wallot/js';
import { CreateAlpacaAchRelationshipTaskParams } from '@wallot/node';
import { alpaca, crypto, db, gcp, log } from '../../services.js';

export const handleCreateAlpacaAchRelationshipTaskOptions = {
	rateLimits: { maxConcurrentDispatches: 6 },
	retryConfig: { maxAttempts: 3, minBackoffSeconds: 30 },
};

/**
 * Preconditions:
 * 	- No ACH Relationship is already pending
 * 	- BANK_ACCOUNT is tokenized
 * 	- USER is activated by Alpaca
 */
export const handleCreateAlpacaAchRelationshipTask: CloudTaskHandler<
	CreateAlpacaAchRelationshipTaskParams
> = async ({ data: { amountInCents, bankAccountId, orderId, userId } }) => {
	// Query the BANK_ACCOUNT
	const bankAccountDoc = await db
		.collection(bankAccountsApi.collectionId)
		.doc(bankAccountId)
		.get();
	if (!bankAccountDoc.exists) {
		// Bank account not found, so this task is not possible
		log(
			{
				message: 'Requested ACH Relationship, but bank account not found',
				bankAccountId,
			},
			{ type: 'error' },
		);
		return Promise.resolve();
	}
	const bankAccount = bankAccountDoc.data() as BankAccount;

	if (isBankAccountPendingAlpacaAchRelationship(bankAccount)) {
		// Precondition failed
		// There is already an ACH relationship pending, so this task is not necessary
		log({
			message:
				'Requested ACH Relationship, but ACH Relationship already pending',
		});
		return Promise.resolve();
	}
	if (!isBankAccountTokenized(bankAccount)) {
		// Precondition failed
		// The bank account is not tokenized, so this task is not possible
		log({
			message: 'Requested ACH Relationship, but bank account is not tokenized',
		});
		return Promise.resolve();
	}

	// Query the USER
	const userDoc = await db.collection(usersApi.collectionId).doc(userId).get();
	if (!userDoc.exists) throw new Error('User not found');
	const user = userDoc.data() as User;
	if (!isUserActivatedByAlpaca(user)) {
		// Precondition failed
		// Kick to the `create_alpaca_account` task
		log({
			message: 'Requested ACH Relationship, but user not activated by Alpaca',
		});
		await gcp.tasks.enqueueCreateAlpacaAccount({
			amountInCents,
			bankAccountId,
			orderId,
			userId,
		});
		return Promise.resolve();
	}

	// Create the ACH relationship
	const achRelationship = await createAlpacaAchRelationship(user, bankAccount);

	// Update the BANK_ACCOUNT
	const bankAccountUpdateParams: UpdateBankAccountParams =
		getBankAccountPropertiesFromAlpacaAchRelationship(achRelationship);
	await db
		.collection(bankAccountsApi.collectionId)
		.doc(bankAccountId)
		.update(bankAccountUpdateParams);

	// Kick to the `refresh_alpaca_ach_relationship_status` task
	await gcp.tasks.enqueueRefreshAlpacaAchRelationshipStatus({
		amountInCents,
		bankAccountId,
		orderId,
		userId,
	});

	// Task complete
	return Promise.resolve();
};

async function createAlpacaAchRelationship(
	user: UserActivatedByAlpaca,
	bankAccount: TokenizedBankAccount,
) {
	const createAlpacaAchRelationshipParams: CreateAlpacaAchRelationshipParams = {
		account_owner_name: bankAccount.account_owner_name,
		bank_account_type: bankAccount.account_type,
		bank_account_number: crypto.decrypt({
			data: bankAccount.account_number_data,
			ivHex: bankAccount.account_number_iv_hex,
		}),
		bank_routing_number: bankAccount.routing_number,
		// nickname: '',
	};
	const response = await alpaca.broker.post<AlpacaAchRelationship>(
		`v1/accounts/${user.alpaca_account_id}/ach_relationships`,
		{
			json: createAlpacaAchRelationshipParams,
		},
	);
	return response.json();
}

type CreateAlpacaAchRelationshipParams = {
	account_owner_name: string;
	bank_account_type: string;
	bank_account_number: string;
	bank_routing_number: string;
	// nickname: string;
};
