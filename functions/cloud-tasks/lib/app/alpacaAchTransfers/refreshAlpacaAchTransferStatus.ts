import { CloudTaskHandler, firebaseFunctions } from 'ergonomic-node';
import { RefreshAlpacaAchTransferStatusTaskParams } from '@wallot/node';
import {
	AchTransfer,
	achTransfersApi,
	isAchTransferRejectedByAlpaca,
	isAchTransferWithFundsReceivedByAlpaca,
	User,
	isUserActivatedByAlpaca,
	getAchTransferPropertiesFromAlpacaAchTransfer,
	getUserPropertiesFromAlpacaAccount,
	usersApi,
	isUserWithAlpacaEquity,
	isAchTransferWithFundsReceivedByAlpacaParams,
	isUserWithAlpacaEquityParams,
	isAchTransferRejectedByAlpacaParams,
} from '@wallot/js';
import { alpaca, db, gcp, log } from '../../services.js';

export const handleRefreshAlpacaAchTransferStatusTaskOptions = {
	rateLimits: { maxConcurrentDispatches: 6 },
	retryConfig: { maxAttempts: 5, minBackoffSeconds: 120 },
};

export const handleRefreshAlpacaAchTransferStatusTask: CloudTaskHandler<
	RefreshAlpacaAchTransferStatusTaskParams
> = async ({ data: { achTransferId, orderId, userId } }) => {
	// Query the ACH_TRANSFER
	const achTransferDoc = await db
		.collection(achTransfersApi.collectionId)
		.doc(achTransferId)
		.get();
	if (!achTransferDoc.exists) {
		// AchTransfer not found, so this task is not possible
		log({
			message:
				'Requested refresh of Alpaca ACH transfer status, but achTransfer not found',
		});
		return Promise.resolve();
	}
	const achTransferInitialData = achTransferDoc.data() as AchTransfer;

	// Query the USER
	const userDoc = await db.collection('users').doc(userId).get();
	if (!userDoc.exists) {
		// User not found, so this task is not possible
		log({
			message:
				'Requested refresh of Alpaca ACH transfer status, but user not found',
		});
		return Promise.resolve();
	}
	const userInitialData = userDoc.data() as User;
	if (!isUserActivatedByAlpaca(userInitialData)) {
		// User is not activated by Alpaca, so this task is not possible
		log({
			message:
				'Requested refresh of Alpaca ACH transfer status, but user not activated by Alpaca',
		});
		return Promise.resolve();
	}

	// Precondition check
	const isSuccessful =
		isAchTransferWithFundsReceivedByAlpaca(achTransferInitialData) &&
		isUserWithAlpacaEquity(userInitialData);
	const isRejected = isAchTransferRejectedByAlpaca(achTransferInitialData);
	if (isSuccessful || isRejected) {
		// Precondition failed
		if (isSuccessful) {
			// ACH_TRANSFER funds already received by Alpaca and updated the User\'s equity, so this task is not necessary
			log({
				message:
					"Requested refresh of Alpaca ACH transfer status, but Alpaca already received funds and updated the User's equity",
			});
		} else {
			// ACH_TRANSFER is already canceled by Alpaca, so this task is not necessary
			log({
				message:
					'Requested refresh of Alpaca ACH transfer status, but transfer already canceled',
			});
		}
		return Promise.resolve();
	}

	// Retrieve the Alpaca ACH Transfer
	const alpacaAchTransfer = await alpaca.broker.retrieveAlpacaAchTransfer(
		userInitialData,
		achTransferInitialData,
	);

	// Update the ACH_TRANSFER
	const updateAchTransferParams =
		getAchTransferPropertiesFromAlpacaAchTransfer(alpacaAchTransfer);
	await db
		.collection(achTransfersApi.collectionId)
		.doc(achTransferId)
		.update(updateAchTransferParams);

	// Retrieve the alpacaAccount
	const alpacaAccount = await alpaca.broker.retrieveAlpacaAccount(
		userInitialData,
	);

	// Update the USER
	const updateUserParams = getUserPropertiesFromAlpacaAccount(alpacaAccount);
	await db
		.collection(usersApi.collectionId)
		.doc(userId)
		.update(updateUserParams);

	// Check if Alpaca received the funds and updated the User's equity
	if (
		isAchTransferWithFundsReceivedByAlpacaParams(updateAchTransferParams) &&
		isUserWithAlpacaEquityParams(updateUserParams)
	) {
		// Alpaca received the funds and updated the User's equity
		// Kick back to the `placeAlpacaOrders` task
		log({
			message:
				"Alpaca received the funds and updated the User's equity. Next up: Place Alpaca Orders",
		});
		await gcp.tasks.enqueuePlaceAlpacaOrders({
			orderId,
		});
		return Promise.resolve();
	}
	if (isAchTransferRejectedByAlpacaParams(updateAchTransferParams)) {
		// Alpaca rejected the ACH transfer
		// End the process
		log({
			code: 'ALPACA_ACH_TRANSFER_FAILED',
			message:
				'Alpaca rejected the ACH transfer. AchTransfer updated with rejection',
			achTransferInitialData,
			alpacaAchTransfer,
		});
		return Promise.resolve();
	}

	// Alpaca is still processing the transfer
	throw new firebaseFunctions.https.HttpsError(
		'internal',
		'Alpaca ACH transfer still processing',
	);
};
