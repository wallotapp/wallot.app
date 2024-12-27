import { KyInstance } from 'ky-universal';
import {
	AlpacaOrder,
	AssetOrderPendingAlpacaFill,
	UserActivatedByAlpaca,
} from '@wallot/js';

export const retrieveAlpacaOrder =
	(alpacaBrokerClient: KyInstance) =>
	async (
		user: UserActivatedByAlpaca,
		assetOrder: AssetOrderPendingAlpacaFill,
	) => {
		const response = await alpacaBrokerClient.get<AlpacaOrder>(
			`v1/trading/accounts/${user.alpaca_account_id}/orders/${assetOrder.alpaca_order_id}`,
		);
		return response.json();
	};
