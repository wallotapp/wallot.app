import { CloudTaskHandler } from 'ergonomic-node';
import { RefreshAlpacaOrdersStatusTaskParams } from '@wallot/node';

export const handleRefreshAlpacaOrdersStatusTaskOptions = {
	rateLimits: { maxConcurrentDispatches: 6 },
	retryConfig: { maxAttempts: 3, minBackoffSeconds: 30 },
};

export const handleRefreshAlpacaOrdersStatusTask: CloudTaskHandler<
	RefreshAlpacaOrdersStatusTaskParams
> = async ({ data: { orderId } }) => {
	orderId;
	return Promise.resolve();
};
