import { KyInstance } from 'ky-universal';
import { AlpacaOrder, AssetOrder, UserWithAlpacaEquity } from '@wallot/js';
import { estimateAlpacaOrder } from './estimateAlpacaOrder.js';
import { SecretData } from '../../SecretDataTypes.js';

export const placeAlpacaOrder =
	(
		alpacaBrokerClient: KyInstance,
		alpacaBrokerEstimationClient: KyInstance,
		secrets: SecretData,
	) =>
	async (user: UserWithAlpacaEquity, assetOrder: AssetOrder) => {
		const defaultPlaceAlpacaOrderParams: {
			side: NonNullable<AlpacaOrder['side']>;
			symbol: NonNullable<AlpacaOrder['symbol']>;
			time_in_force: NonNullable<AlpacaOrder['time_in_force']>;
			type: NonNullable<AlpacaOrder['type']>;
		} = {
			side: assetOrder.alpaca_order_side ?? 'buy',
			symbol: assetOrder.alpaca_order_symbol,
			time_in_force: assetOrder.alpaca_order_time_in_force ?? 'day',
			type: assetOrder.alpaca_order_type ?? 'market',
		};

		// Initialize the order params
		let placeAlpacaOrderParams: typeof defaultPlaceAlpacaOrderParams & {
			qty: string;
		};

		if (assetOrder.alpaca_order_qty == null) {
			// Estimate the qty if not provided
			const { qty } = await estimateAlpacaOrder(
				alpacaBrokerEstimationClient,
				secrets,
			)({
				symbol: assetOrder.alpaca_order_symbol,
				notional: assetOrder.amount,
			});

			if (qty == null) {
				throw new Error('Failed to estimate the order qty');
			}

			placeAlpacaOrderParams = {
				...defaultPlaceAlpacaOrderParams,
				qty,
			};
		} else {
			// Use the provided qty
			placeAlpacaOrderParams = {
				...defaultPlaceAlpacaOrderParams,
				qty: assetOrder.alpaca_order_qty,
			};
		}

		const response = await alpacaBrokerClient.post<AlpacaOrder>(
			`v1/trading/accounts/${user.alpaca_account_id}/orders`,
			{
				json: placeAlpacaOrderParams,
			},
		);
		return response.json();
	};
