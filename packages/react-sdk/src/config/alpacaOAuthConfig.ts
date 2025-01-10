import { DEPLOYMENT_ENV } from 'ergonomic-react/src/config/deploymentEnv';

const liveAlpacaOAuthAppBaseUrl =
	process.env.NEXT_PUBLIC_LIVE_ALPACA_OAUTH_APP_BASE_URL;
const testAlpacaOAuthAppBaseUrl =
	process.env.NEXT_PUBLIC_TEST_ALPACA_OAUTH_APP_BASE_URL;
export const alpacaOAuthAppBaseUrl = {
	live: liveAlpacaOAuthAppBaseUrl,
	test: testAlpacaOAuthAppBaseUrl,
}[DEPLOYMENT_ENV];

if (!alpacaOAuthAppBaseUrl) {
	throw new Error('Missing Alpaca OAuth App Base URL');
}

export const ALPACA_OAUTH_APP_BASE_URL = alpacaOAuthAppBaseUrl;

const liveAlpacaOAuthClientId =
	process.env.NEXT_PUBLIC_LIVE_ALPACA_OAUTH_CLIENT_ID;
const testAlpacaOAuthClientId =
	process.env.NEXT_PUBLIC_TEST_ALPACA_OAUTH_CLIENT_ID;
export const alpacaOAuthClientId = {
	live: liveAlpacaOAuthClientId,
	test: testAlpacaOAuthClientId,
}[DEPLOYMENT_ENV];

if (!alpacaOAuthClientId) {
	throw new Error('Missing Alpaca OAuth Client ID');
}

export const ALPACA_OAUTH_CLIENT_ID = alpacaOAuthClientId;
