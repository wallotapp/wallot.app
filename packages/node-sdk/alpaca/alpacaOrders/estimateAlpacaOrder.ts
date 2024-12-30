import { handleKyError, getCurrencyUsdStringFromCents } from 'ergonomic';
import { KyInstance } from 'ky-universal';
import { AlpacaOrder } from '@wallot/js';
import { SecretData } from '../../SecretDataTypes.js';

export const estimateAlpacaOrder =
	(alpacaBrokerEstimationClient: KyInstance, secrets: SecretData) =>
	async (params: { symbol: string; notional: number }) => {
		try {
			const estimateAlpacaOrderParams = {
				notional: getCurrencyUsdStringFromCents(params.notional)
					.replace('$', '')
					.replace(/,/g, ''),
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
		} catch (err) {
			const kyErr = await handleKyError(err);
			return Promise.reject(kyErr);
		}
	};
