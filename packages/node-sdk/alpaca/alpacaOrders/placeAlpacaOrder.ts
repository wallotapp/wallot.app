import { KyInstance } from 'ky-universal';
import { AlpacaOrder, AssetOrder, UserWithAlpacaEquity } from '@wallot/js';

export const placeAlpacaOrder =
	(alpacaBrokerClient: KyInstance) =>
	async (user: UserWithAlpacaEquity, assetOrder: AssetOrder) => {
		const placeAlpacaOrderParams: Pick<
			AlpacaOrder,
			'qty' | 'side' | 'symbol' | 'time_in_force' | 'type'
		> = {
			qty: assetOrder.alpaca_order_qty,
			side: assetOrder.alpaca_order_side,
			symbol: assetOrder.alpaca_order_symbol,
			time_in_force: assetOrder.alpaca_order_time_in_force,
			type: assetOrder.alpaca_order_type,
		};
		const response = await alpacaBrokerClient.post<AlpacaOrder>(
			`v1/trading/accounts/${user.alpaca_account_id}/orders`,
			{
				json: placeAlpacaOrderParams,
			},
		);
		return response.json();
	};
