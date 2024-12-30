import { handleKyError } from 'ergonomic';
import { KyInstance } from 'ky-universal';
import { KycUser } from '@wallot/js';

export const downloadAlpacaDocument =
	(alpacaBrokerDownloadClient: KyInstance) =>
	async (user: KycUser, documentId: string) => {
		try {
			const response = await alpacaBrokerDownloadClient.get(
				`v1/accounts/${user.alpaca_account_id}/documents/${documentId}/download`,
			);
			// Extract the pre-signed URL from the 'location' header
			const downloadUrl = response.headers.get('location');
			if (!downloadUrl) {
				throw new Error('Download URL not found in response');
			}
			return { download_url: downloadUrl };
		} catch (err) {
			const kyErr = await handleKyError(err);
			return Promise.reject(kyErr);
		}
	};
