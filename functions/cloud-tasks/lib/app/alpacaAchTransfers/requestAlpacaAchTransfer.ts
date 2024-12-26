import {
	AlpacaAchTransfer,
	BankAccountApprovedByAlpaca,
	User,
	usersApi,
	UserActivatedByAlpaca,
	isUserActivatedByAlpaca,
	achTransfersApi,
	CreateAchTransferParams,
	getAchTransferPropertiesFromAlpacaAchTransfer,
	bankAccountsApi,
	BankAccount,
	isBankAccountApprovedByAlpaca,
} from '@wallot/js';
import { CloudTaskHandler } from 'ergonomic-node';
import { RequestAlpacaAchTransferTaskParams } from '@wallot/node';
import { alpaca, db, gcp, log } from '../../services.js';
import { getCurrencyUsdStringFromCents } from 'ergonomic';

export const handleRequestAlpacaAchTransferTaskOptions = {
	rateLimits: { maxConcurrentDispatches: 6 },
	retryConfig: { maxAttempts: 3, minBackoffSeconds: 30 },
};

/**
 * Preconditions:
 *  - No ACH_TRANSFER is already pending
 *  - BANK_ACCOUNT is approved by Alpaca
 * 	- USER is activated by Alpaca
 */
export const handleRequestAlpacaAchTransferTask: CloudTaskHandler<
	RequestAlpacaAchTransferTaskParams
> = async ({ data: { amountInCents, bankAccountId, orderId, userId } }) => {
	// Query the ACH_TRANSFERs
	const achTransfersQuery = await db
		.collection(achTransfersApi.collectionId)
		.where('bank_account', '==', bankAccountId)
		.get();
	if (!achTransfersQuery.empty) {
		// Precondition failed
		// There is already an ACH_TRANSFER pending, so this task is not necessary
		log({
			message: 'Requested ACH Transfer, but ACH Transfer already pending',
		});
		return Promise.resolve();
	}

	// Query the BANK_ACCOUNT
	const bankAccountDoc = await db
		.collection(bankAccountsApi.collectionId)
		.doc(bankAccountId)
		.get();
	if (!bankAccountDoc.exists) {
		// Bank account not found, so this task is not possible
		log(
			{
				message: 'Requested ACH Transfer, but bank account not found',
				bankAccountId,
			},
			{ type: 'error' },
		);
		return Promise.resolve();
	}
	const bankAccount = bankAccountDoc.data() as BankAccount;

	if (!isBankAccountApprovedByAlpaca(bankAccount)) {
		// Precondition failed
		// Kick to the `create_alpaca_ach_relationship` task
		log({ message: 'Requested ACH Transfer, but bank account not approved' });
		await gcp.tasks.enqueueCreateAlpacaAchRelationship({
			amountInCents,
			bankAccountId,
			orderId,
			userId,
		});
		return Promise.resolve();
	}

	// Query the USER
	const userDoc = await db.collection(usersApi.collectionId).doc(userId).get();
	if (!userDoc.exists) throw new Error('User not found');
	const user = userDoc.data() as User;
	if (!isUserActivatedByAlpaca(user)) {
		// This will never happen -- the user must be activated by Alpaca to have a BANK_ACCOUNT approved by Alpaca
		log(
			{
				message:
					'Requested ACH Transfer, but the user is not activated by Alpaca',
				userId,
			},
			{ type: 'error' },
		);
		return Promise.resolve();
	}

	// Request the ACH_TRANSFER
	const alpacaAchTransfer = await requestAlpacaAchTransfer(
		user,
		bankAccount,
		amountInCents,
	);
	const achTransferCreateParams: CreateAchTransferParams = {
		bank_account: bankAccount._id,
		name: '',
		category: 'incoming',
		...getAchTransferPropertiesFromAlpacaAchTransfer(alpacaAchTransfer),
	};
	const achTransfer = achTransfersApi.mergeCreateParams({
		createParams: achTransferCreateParams,
	});
	await db
		.collection(achTransfersApi.collectionId)
		.doc(achTransfer._id)
		.set(achTransfer);

	// Kick to the `refresh_alpaca_ach_transfer_status` task
	await gcp.tasks.enqueueRefreshAlpacaAchTransferStatus({ orderId });

	// Task complete
	return Promise.resolve();
};

async function requestAlpacaAchTransfer(
	user: UserActivatedByAlpaca,
	bankAccount: BankAccountApprovedByAlpaca,
	amountInCents: number,
) {
	if (amountInCents <= 0) {
		throw new Error('Amount must be greater than 0');
	}

	const response = await alpaca.broker.post<AlpacaAchTransfer>(
		`v1/accounts/${user.alpaca_account_id}/transfers`,
		{
			json: {
				transfer_type: 'ach',
				relationship_id: bankAccount.alpaca_ach_relationship_id,
				amount: getCurrencyUsdStringFromCents(amountInCents)
					.replace('$', '')
					.replace(/,/g, ''),
				direction: 'INCOMING',
			},
		},
	);
	return response.json();
}
