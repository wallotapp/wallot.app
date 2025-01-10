import { handleKyError } from 'ergonomic';
import { KyInstance } from 'ky-universal';
import { CreateAlpacaAccessTokenParams } from '@wallot/js';
import { SecretData } from '../../SecretDataTypes.js';

export const createAlpacaAccessToken =
	(
		alpacaOAuthClient: KyInstance,
		{
			SECRET_CRED_ALPACA_OAUTH_CLIENT_ID,
			SECRET_CRED_ALPACA_OAUTH_CLIENT_SECRET,
		}: SecretData,
	) =>
	async ({ code, redirect_uri }: CreateAlpacaAccessTokenParams) => {
		try {
			const params: CreateAlpacaAccessTokenApiParams = {
				client_id: SECRET_CRED_ALPACA_OAUTH_CLIENT_ID,
				client_secret: SECRET_CRED_ALPACA_OAUTH_CLIENT_SECRET,
				code,
				grant_type: 'authorization_code',
				redirect_uri,
			};
			const response =
				await alpacaOAuthClient.post<CreateAlpacaAccessTokenApiResponse>(
					'oauth/token',
					{
						json: params,
					},
				);
			return response.json();
		} catch (err) {
			const kyErr = await handleKyError(err);
			return Promise.reject(kyErr);
		}
	};

type CreateAlpacaAccessTokenApiParams = CreateAlpacaAccessTokenParams & {
	client_id: string;
	client_secret: string;
	grant_type: 'authorization_code';
};
type CreateAlpacaAccessTokenApiResponse = {
	access_token: string;
	scope: string;
	token_type: string;
};
