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
> = async ({ data: { achTransferId, orderId } }) => {
	achTransferId;
	orderId;
	return Promise.resolve();
};

async function retrieveAlpacaAchTransfer(
	user: UserActivatedByAlpaca,
	achTransfer: AchTransfer,
) {
	const response = await alpaca.broker.get<AlpacaAchTransfer>(
		`v1/todo/${user.alpaca_account_id}`,
	);
	return response.json();
}
