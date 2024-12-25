import { default as ky } from 'ky';
import { SecretData } from '../../SecretDataTypes.js';

/**
 * Alpha Vantage API client.
 *
 * This client is pre-configured with the necessary base URL and API key to interact with the Alpha Vantage API.
 *
 * Environment Variables:
 * - `SECRET_CRED_ALPHA_VANTAGE_API_KEY`: Your Alpha Vantage API key.
 *
 * @example
 * ```javascript
 * import getAlphaVantageClient from './getAlphaVantageClient.js';
 * import { secrets } from './secrets.js';
 *
 * (async () => {
 *  const response = await getAlphaVantageClient(secrets).get('', {
 *   searchParams: {
 *     function: 'OVERVIEW',
 *     symbol: 'IBM',
 *   },
 *  });
 *
 *  const data = await response.json();
 *  console.log(data);
 * })();
 *```
 *
 */
export const getAlphaVantageClient = ({ SECRET_CRED_ALPHA_VANTAGE_API_KEY }: SecretData) =>
	ky.create({
		prefixUrl: 'https://www.alphavantage.co/query',
		searchParams: {
			apikey: SECRET_CRED_ALPHA_VANTAGE_API_KEY,
		},
	});
