import { CloudTaskHandler } from 'ergonomic-node';
import { RefreshAlpacaAchTransferStatusTaskParams } from '@wallot/node';
import {
	AchTransfer,
	AlpacaAchTransfer,
	UserActivatedByAlpaca,
} from '@wallot/js';
import { alpaca } from '../../services.js';

export const handleRefreshAlpacaAchTransferStatusTaskOptions = {
	rateLimits: { maxConcurrentDispatches: 6 },
	retryConfig: { maxAttempts: 5, minBackoffSeconds: 120 },
};

export const handleRefreshAlpacaAchTransferStatusTask: CloudTaskHandler<
	RefreshAlpacaAchTransferStatusTaskParams
> = async ({ data: { achTransferId, orderId, userId } }) => {
	// Query the ACH_TRANSFER
	// Retrieve the alpacaAchTransfer
	// Retrieve the alpacaAccount
	// Update the ACH_TRANSFER
	// Update the USER

	return Promise.resolve();
};
