import { handleKyError } from 'ergonomic';
import { KyInstance } from 'ky-universal';
import { AlpacaPosition, KycUser } from '@wallot/js';

export const retrieveAlpacaPositions =
	(alpacaBrokerClient: KyInstance) => async (user: KycUser) => {
		try {
			const response = await alpacaBrokerClient.get<AlpacaPosition[]>(
				`v1/trading/accounts/${user.alpaca_account_id}/positions`,
			);
			return response.json();
		} catch (err) {
			const kyErr = await handleKyError(err);
			return Promise.reject(kyErr);
		}
	};
