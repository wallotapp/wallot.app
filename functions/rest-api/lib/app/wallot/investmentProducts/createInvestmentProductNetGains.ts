import { InvestmentProduct } from '@wallot/js';
import { deriveNetGainForInvestmentProduct } from '../../../utils/deriveNetGainForInvestmentProduct';

export const createInvestmentProductNetGains = async (
	investmentProducts: InvestmentProduct | InvestmentProduct[],
) =>
	Promise.all(
		(Array.isArray(investmentProducts)
			? investmentProducts
			: [investmentProducts]
		).map(deriveNetGainForInvestmentProduct),
	);
