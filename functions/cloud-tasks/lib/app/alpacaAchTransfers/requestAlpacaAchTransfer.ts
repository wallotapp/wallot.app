import {
	User,
	usersApi,
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
> = async ({
	data: {
		achTransferId,
		amountInCents,
		bankAccountId,
		direction = 'INCOMING',
		orderId,
		userId,
	},
}) => {
	// Query the ACH_TRANSFER
	const achTransfersQuery = await db
		.collection(achTransfersApi.collectionId)
		.where('_id', '==', achTransferId)
		.get();
	if (!achTransfersQuery.empty) {
		// Precondition failed
		// There is already an ACH_TRANSFER pending with this ID, so this task is not necessary
		log({
			message:
				'Requested ACH Transfer, but ACH Transfer already pending with ID: ' +
				achTransferId,
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
		// Kick to the `createAlpacaAchRelationship` task
		log({ message: 'Requested ACH Transfer, but bank account not approved' });
		await gcp.tasks.enqueueCreateAlpacaAchRelationship({
			achTransferId,
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
	const alpacaAchTransfer = await alpaca.broker.requestAlpacaAchTransfer(
		user,
		bankAccount,
		amountInCents,
		direction,
	);
	const achTransferCreateParams: CreateAchTransferParams = {
		_id: achTransferId,
		bank_account: bankAccount._id,
		name: '',
		category: { INCOMING: 'incoming' as const, OUTGOING: 'outgoing' as const }[
			direction
		],
		...getAchTransferPropertiesFromAlpacaAchTransfer(alpacaAchTransfer),
	};
	const achTransfer = achTransfersApi.mergeCreateParams({
		createParams: achTransferCreateParams,
	});
	await db
		.collection(achTransfersApi.collectionId)
		.doc(achTransfer._id)
		.set(achTransfer);

	// Kick to the `refreshAlpacaAchTransferStatus` task
	await gcp.tasks.enqueueRefreshAlpacaAchTransferStatus({
		achTransferId: achTransfer._id,
		orderId,
		userId,
	});

	// Task complete
	return Promise.resolve();
};
