import { CloudTaskHandler } from 'ergonomic-node';
import { RefreshAlpacaAchRelationshipStatusTaskParams } from '@wallot/node';

export const handleRefreshAlpacaAchRelationshipStatusTaskOptions = {
	rateLimits: { maxConcurrentDispatches: 6 },
	retryConfig: { maxAttempts: 3, minBackoffSeconds: 30 },
};

export const handleRefreshAlpacaAchRelationshipStatusTask: CloudTaskHandler<
	RefreshAlpacaAchRelationshipStatusTaskParams
> = async ({ data: { amountInCents, bankAccountId, orderId, userId } }) => {
	amountInCents;
	bankAccountId;
	orderId;
	userId;
	return Promise.resolve();
};
