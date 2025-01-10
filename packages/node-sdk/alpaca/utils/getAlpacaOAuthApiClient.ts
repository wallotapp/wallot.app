import { default as ky } from 'ky-universal';
import { SecretData } from '../../SecretDataTypes.js';

/**
 * Alpaca OAuth API client.
 *
 * This client is pre-configured with the necessary headers and base URL to interact with the Alpaca OAuth API.
 */
export const getAlpacaOAuthApiClient = ({
	SECRET_CRED_ALPACA_OAUTH_API_BASE_URL,
}: SecretData) =>
	ky.create({
		prefixUrl: SECRET_CRED_ALPACA_OAUTH_API_BASE_URL,
		headers: { accept: 'application/json' },
	});
