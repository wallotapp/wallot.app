import { handleKyError } from 'ergonomic';
import { default as fetch } from 'node-fetch';
import { KycUser } from '@wallot/js';
import { SecretData } from '../../SecretDataTypes.js';

export const downloadAlpacaDocument =
	(secrets: SecretData) => async (user: KycUser, documentId: string) => {
		try {
			const response = await fetch(
				`${secrets.SECRET_CRED_ALPACA_BROKER_API_BASE_URL}/v1/accounts/${user.alpaca_account_id}/documents/${documentId}/download`,
				{
					headers: {
						Authorization: `Basic ${Buffer.from(
							`${secrets.SECRET_CRED_ALPACA_BROKER_API_KEY}:${secrets.SECRET_CRED_ALPACA_BROKER_API_SECRET}`,
						).toString('base64')}`,
					},
				},
			);

			const downloadUrl = response.url;
			if (!downloadUrl) {
				throw new Error('Download URL not found in response');
			}
			return { download_url: downloadUrl };
		} catch (err) {
			const kyErr = await handleKyError(err);
			return Promise.reject(kyErr);
		}
	};
