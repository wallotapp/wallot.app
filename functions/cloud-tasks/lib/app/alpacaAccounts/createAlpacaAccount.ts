import { CloudTaskHandler } from 'ergonomic-node';
import { CreateAlpacaAccountTaskParams } from '@wallot/node';

export const handleCreateAlpacaAccountTaskOptions = {
	rateLimits: { maxConcurrentDispatches: 6 },
	retryConfig: { maxAttempts: 3, minBackoffSeconds: 30 },
};

export const handleCreateAlpacaAccountTask: CloudTaskHandler<
	CreateAlpacaAccountTaskParams
> = async ({ data: { amountInCents, bankAccountId, orderId, userId } }) => {
	amountInCents;
	bankAccountId;
	orderId;
	userId;
	return Promise.resolve();
};
