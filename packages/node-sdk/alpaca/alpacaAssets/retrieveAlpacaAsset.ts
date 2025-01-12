import { handleKyError } from 'ergonomic';
import { KyInstance } from 'ky-universal';
import { AlpacaAsset } from '@wallot/js';

export const retrieveAlpacaAsset =
	(alpacaBrokerClient: KyInstance) => async (symbol: string) => {
		try {
			const response = await alpacaBrokerClient.get<AlpacaAsset>(
				`v1/assets/${symbol}`,
			);
			return response.json();
		} catch (err) {
			const kyErr = await handleKyError(err);
			return Promise.reject(kyErr);
		}
	};
