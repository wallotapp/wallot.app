import { CloudTaskHandler } from 'ergonomic-node';
import { RefreshAlpacaAccountStatusTaskParams } from '@wallot/node';

export const handleRefreshAlpacaAccountStatusTaskOptions = {
	rateLimits: { maxConcurrentDispatches: 6 },
	retryConfig: { maxAttempts: 3, minBackoffSeconds: 30 },
};

export const handleRefreshAlpacaAccountStatusTask: CloudTaskHandler<
	RefreshAlpacaAccountStatusTaskParams
> = async ({ data: { amountInCents, bankAccountId, orderId, userId } }) => {
	amountInCents;
	bankAccountId;
	orderId;
	userId;
	return Promise.resolve();
};
