import { handleKyError } from 'ergonomic';
import { KyInstance } from 'ky-universal';
import {
	CreateAlpacaAccessTokenParams,
	CreateAlpacaAccessTokenResponse,
} from '@wallot/js';

export const createAlpacaAccessToken =
	(alpacaOAuthClient: KyInstance) =>
	async (params: CreateAlpacaAccessTokenParams) => {
		try {
			const response =
				await alpacaOAuthClient.post<CreateAlpacaAccessTokenResponse>(
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
