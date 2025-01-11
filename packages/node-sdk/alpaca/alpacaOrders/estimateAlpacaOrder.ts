import {
	handleKyError,
	getCurrencyUsdStringFromCents,
	Writeable,
} from 'ergonomic';
import { KyInstance } from 'ky-universal';
import { AlpacaOrder } from '@wallot/js';
import { SecretData } from '../../SecretDataTypes.js';

export const estimateAlpacaOrder =
	(alpacaBrokerEstimationClient: KyInstance, secrets: SecretData) =>
	async ({
		symbol,
		notional,
	}: EstimateAlpacaOrderParams): Promise<AlpacaOrder> => {
		try {
			const fiveHundredDollarsInCents = 500 * 100;
			const estimateAlpacaOrderParams = {
				notional: getCurrencyUsdStringFromCents(
					Math.min(notional, fiveHundredDollarsInCents),
				)
					.replace('$', '')
					.replace(/,/g, ''),
				side: 'buy',
				symbol,
				time_in_force: 'day',
				type: 'market',
			};
			const response = await alpacaBrokerEstimationClient.post<AlpacaOrder>(
				`v1/trading/accounts/${secrets.SECRET_CRED_ALPACA_BROKER_ESTIMATION_ACCOUNT_ID}/orders/estimation`,
				{
					json: estimateAlpacaOrderParams,
				},
			);
			const json = await response.json();

			const { filled_avg_price: approxPricePerShareString } = json;
			if (approxPricePerShareString == null) {
				throw new Error(
					'Missing filled_avg_price in Alpaca order estimation response',
				);
			}
			const approxPricePerShareStringHasDecimal =
				approxPricePerShareString.includes('.');
			const approxPricePerSharesPretty = approxPricePerShareStringHasDecimal
				? approxPricePerShareString.split('.')[1]?.length === 1
					? `${approxPricePerShareString}0`
					: approxPricePerShareString
				: `${approxPricePerShareString}.00`;
			(json as Writeable<AlpacaOrder>).filled_avg_price =
				approxPricePerSharesPretty;

			if (notional <= fiveHundredDollarsInCents) return json;

			const approxPricePerShare = parseFloat(approxPricePerShareString);
			if (isNaN(approxPricePerShare)) {
				throw new Error(
					`Invalid filled_avg_price in Alpaca order estimation response: ${approxPricePerShareString}`,
				);
			}

			const notionalDollars = notional / 100;
			const approxNumShares = notionalDollars / approxPricePerShare;
			(json as Writeable<AlpacaOrder>).filled_qty = String(approxNumShares);
			(json as Writeable<AlpacaOrder>).notional = getCurrencyUsdStringFromCents(
				notional,
			)
				.replace('$', '')
				.replace(/,/g, '');
			return json;
		} catch (err) {
			const kyErr = await handleKyError(err);
			return Promise.reject(kyErr);
		}
	};

type EstimateAlpacaOrderParams = {
	symbol: string;
	notional: number;
};
