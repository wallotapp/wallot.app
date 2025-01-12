import { handleKyError } from 'ergonomic';
import { KyInstance } from 'ky-universal';
import { AlphaVantageDailyTimeSeriesResponse } from '@wallot/js';

/**
 * Retrieves daily adjusted time series data for a given stock symbol.
 *
 * @param alphaVantageClient - The KyInstance client used to make the API request.
 * @returns A function that accepts a stock symbol and an optional output size to fetch the time series data.
 * @see {@link AlphaVantageDailyTimeSeriesResponse} for the response structure.
 *
 * @example
 * ```typescript
 * const fetchTimeSeries = retrieveTimeSeriesData(alphaVantageClient);
 * fetchTimeSeries('AAPL', 'full')
 *   .then(data => console.log(data))
 *   .catch(error => console.error(error));
 * ```
 */
export const retrieveTimeSeriesData =
	(alphaVantageClient: KyInstance) =>
	async (symbol: string, outputSize?: 'full') => {
		try {
			const response =
				await alphaVantageClient.get<AlphaVantageDailyTimeSeriesResponse>('', {
					searchParams: {
						function: 'TIME_SERIES_DAILY_ADJUSTED',
						symbol,
						...(outputSize != null && { outputsize: outputSize }),
					},
				});

			return response.json();
		} catch (err) {
			const kyErr = await handleKyError(err);
			return Promise.reject(kyErr);
		}
	};
