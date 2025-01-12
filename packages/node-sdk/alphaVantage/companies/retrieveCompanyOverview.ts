import { handleKyError } from 'ergonomic';
import { KyInstance } from 'ky-universal';
import { AlphaVantageCompany } from '@wallot/js';

export const retrieveCompanyOverview =
	(alphaVantageClient: KyInstance) => async (symbol: string) => {
		try {
			const response = await alphaVantageClient.get<AlphaVantageCompany>('', {
				searchParams: {
					function: 'OVERVIEW',
					symbol,
				},
			});

			return response.json();
		} catch (err) {
			const kyErr = await handleKyError(err);
			return Promise.reject(kyErr);
		}
	};
