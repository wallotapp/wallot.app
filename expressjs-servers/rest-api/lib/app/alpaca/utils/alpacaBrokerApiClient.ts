import { default as ky } from 'ky';
import { secrets } from '../../../secrets.js';
const {
	SECRET_CRED_ALPACA_BROKER_API_BASE_URL,
	SECRET_CRED_ALPACA_BROKER_API_KEY,
	SECRET_CRED_ALPACA_BROKER_API_SECRET,
} = secrets;

/**
 * Alpaca Broker API client.
 *
 * This client is pre-configured with the necessary headers and base URL to interact with the Alpaca Broker API.
 * The `authorization` header is dynamically generated using the `SECRET_CRED_ALPACA_BROKER_API_KEY` and
 * `SECRET_CRED_ALPACA_BROKER_API_SECRET` environment variables, which must be set in your runtime environment.
 *
 * Environment Variables:
 * - `SECRET_CRED_ALPACA_BROKER_API_BASE_URL`: The base URL for the Alpaca Broker API
 * - `SECRET_CRED_ALPACA_BROKER_API_KEY`: Your Alpaca API key.
 * - `SECRET_CRED_ALPACA_BROKER_API_SECRET`: Your Alpaca API secret.
 *
 * Example Usage:
 * ```javascript
 * import alpacaBrokerApiClient from './alpacaBrokerApiClient';
 *
 * (async () => {
 *   try {
 *     const response = await alpacaBrokerApiClient.get('v1/accounts').json();
 *     console.log(response);
 *   } catch (error) {
 *     console.error('Error fetching account info:', error);
 *   }
 * })();
 * ```
 *
 * @module alpacaBrokerApiClient
 */
const alpacaBrokerApiClient = ky.create({
	prefixUrl: SECRET_CRED_ALPACA_BROKER_API_BASE_URL,
	headers: {
		accept: 'application/json',
		authorization: `Basic ${Buffer.from(
			`${SECRET_CRED_ALPACA_BROKER_API_KEY}:${SECRET_CRED_ALPACA_BROKER_API_SECRET}`,
		).toString('base64')}`,
	},
});

export default alpacaBrokerApiClient;
