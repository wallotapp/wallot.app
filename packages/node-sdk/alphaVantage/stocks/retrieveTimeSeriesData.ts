import { handleKyError } from 'ergonomic';
import { KyInstance } from 'ky-universal';
import { AlphaVantageDailyTimeSeriesResponse } from '@wallot/js';

export const retrieveTimeSeriesData =
	(alphaVantageClient: KyInstance) => async (symbol: string) => {
		try {
			throw new Error('Alpha Vantage API not implemented');
		} catch (err) {
			const kyErr = await handleKyError(err);
			return Promise.reject(kyErr);
		}
	};
