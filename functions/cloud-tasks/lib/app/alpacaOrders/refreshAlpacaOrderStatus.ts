import { CloudTaskHandler } from 'ergonomic-node';
import { RefreshAlpacaOrderStatusTaskParams } from '@wallot/node';
import {
	AlpacaOrder,
	AssetOrderPendingAlpacaFill,
	UserActivatedByAlpaca,
} from '@wallot/js';
import { alpaca } from '../../services.js';

export const handleRefreshAlpacaOrderStatusTaskOptions = {
	rateLimits: { maxConcurrentDispatches: 6 },
	retryConfig: { maxAttempts: 5, minBackoffSeconds: 120 },
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
	const response = await alpaca.broker.get<AlpacaOrder>(
		`v1/trading/accounts/${user.alpaca_account_id}/orders/${assetOrder.alpaca_order_id}`,
	);
	return response.json();
}
