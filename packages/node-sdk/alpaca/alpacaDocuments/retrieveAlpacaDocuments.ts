import { handleKyError } from 'ergonomic';
import { KyInstance } from 'ky-universal';
import { AlpacaDocument, KycUser } from '@wallot/js';

export const retrieveAlpacaDocuments =
	(alpacaBrokerClient: KyInstance) => async (user: KycUser) => {
		try {
			const response = await alpacaBrokerClient.get<AlpacaDocument[]>(
				`v1/accounts/${user.alpaca_account_id}/documents`,
			);
			return response.json();
		} catch (err) {
			const kyErr = await handleKyError(err);
			return Promise.reject(kyErr);
		}
	};
