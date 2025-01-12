import { InvestmentProduct } from '@wallot/js';
import { deriveNetGainForInvestmentProduct } from '../../../utils/deriveNetGainForInvestmentProduct';

export const createInvestmentProductNetGains = async (
	investmentProducts: InvestmentProduct | InvestmentProduct[],
	daysAfterEntry = 30,
	investmentProductNetGainsIds: (string | null)[] | null = null,
) =>
	Promise.all(
		(Array.isArray(investmentProducts)
			? investmentProducts
			: [investmentProducts]
		).map((product, idx) =>
			deriveNetGainForInvestmentProduct(
				product,
				daysAfterEntry,
				investmentProductNetGainsIds?.[idx],
			),
		),
	);
