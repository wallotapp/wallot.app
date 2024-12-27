import { CloudTaskHandler } from 'ergonomic-node';
import { RefreshAlpacaAchTransferStatusTaskParams } from '@wallot/node';
import {
	AchTransfer,
	AlpacaAchTransfer,
	UserActivatedByAlpaca,
	achTransfersApi,
	isAchTransferRejectedByAlpaca,
	isAchTransferWithFundsReceivedByAlpaca,
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
	const isSuccessful = isAchTransferWithFundsReceivedByAlpaca(
		achTransferInitialData,
	);
	const isRejected = isAchTransferRejectedByAlpaca(achTransferInitialData);
	if (isSuccessful || isRejected) {
		// Precondition failed
		if (isSuccessful) {
			// ACH_TRANSFER funds already received by Alpaca, so this task is not necessary
			log({
				message:
					'Requested refresh of Alpaca ACH transfer status, but Alpaca already received funds',
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

	// Retrieve the alpacaAchTransfer
	// Retrieve the alpacaAccount
	// Update the ACH_TRANSFER
	// Update the USER

	return Promise.resolve();
};
