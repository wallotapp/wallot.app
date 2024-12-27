import { KyInstance } from 'ky-universal';
import { AlpacaOrder } from '@wallot/js';
import { SecretData } from '../../SecretDataTypes.js';

export const estimateAlpacaOrder =
	(alpacaBrokerEstimationClient: KyInstance, secrets: SecretData) =>
	async (params: { symbol: string; notional: number }) => {
		const estimateAlpacaOrderParams = {
			notional: params.notional.toString(),
			side: 'buy',
			symbol: params.symbol,
			time_in_force: 'day',
			type: 'market',
		};
		const response = await alpacaBrokerEstimationClient.post<AlpacaOrder>(
			`v1/trading/accounts/${secrets.SECRET_CRED_ALPACA_BROKER_ESTIMATION_ACCOUNT_ID}/orders/estimation`,
			{
				json: estimateAlpacaOrderParams,
			},
		);
		return response.json();
	};
