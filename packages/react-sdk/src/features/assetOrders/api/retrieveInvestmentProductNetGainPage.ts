import { handleKyError } from 'ergonomic';
import { defaultKyInstance } from '@wallot/react/src/lib/ky';
import { InvestmentProductNetGainPage } from '@wallot/js';

export const retrieveInvestmentProductNetGainPage = async (
	searchParams: Record<string, never>,
) => {
	try {
		const data = await defaultKyInstance
			.get('v0/products/roi', {
				searchParams,
			})
			.json<InvestmentProductNetGainPage>();
		return data;
	} catch (err) {
		const kyErr = await handleKyError(err);
		return Promise.reject(kyErr);
	}
};
