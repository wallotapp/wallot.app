import { CloudTaskHandler } from 'ergonomic-node';
import { RefreshAlpacaOrderStatusTaskParams } from '@wallot/node';
import {
	AlpacaAccount,
	AssetOrderPendingAlpacaFill,
	UserActivatedByAlpaca,
} from '@wallot/js';
import { alpaca } from '../../services.js';

export const handleRefreshAlpacaOrderStatusTaskOptions = {
	rateLimits: { maxConcurrentDispatches: 6 },
	retryConfig: { maxAttempts: 3, minBackoffSeconds: 30 },
};

export const handleRefreshAlpacaOrderStatusTask: CloudTaskHandler<
	RefreshAlpacaOrderStatusTaskParams
> = async ({ data: { assetOrderId } }) => {
	assetOrderId;
	return Promise.resolve();
};

async function retrieveAlpacaOrder(
	user: UserActivatedByAlpaca,
	assetOrder: AssetOrderPendingAlpacaFill,
) {
	const response = await alpaca.broker.get<AlpacaAccount>(
		`v1/todo/${user.alpaca_account_id}`,
	);
	return response.json();
}
