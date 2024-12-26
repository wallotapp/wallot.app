import { CloudTaskHandler } from 'ergonomic-node';
import { RefreshAlpacaAchTransferStatusTaskParams } from '@wallot/node';

export const handleRefreshAlpacaAchTransferStatusTaskOptions = {
	rateLimits: { maxConcurrentDispatches: 6 },
	retryConfig: { maxAttempts: 3, minBackoffSeconds: 30 },
};

export const handleRefreshAlpacaAchTransferStatusTask: CloudTaskHandler<
	RefreshAlpacaAchTransferStatusTaskParams
> = async ({ data: { achTransferId, orderId } }) => {
	achTransferId;
	orderId;
	return Promise.resolve();
};
