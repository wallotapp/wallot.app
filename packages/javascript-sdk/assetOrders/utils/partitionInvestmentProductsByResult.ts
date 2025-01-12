import { InvestmentProductNetGain } from '../types/InvestmentProductTypes.js';

export const partitionInvestmentProductsByResult = (
	investmentProducts: InvestmentProductNetGain[],
) =>
	investmentProducts.reduce(
		(
			[winningInvestmentProducts, losingInvestmentProducts],
			investmentProduct,
		) => {
			if (investmentProduct.results.summary === 'win') {
				winningInvestmentProducts.push(investmentProduct);
			} else {
				losingInvestmentProducts.push(investmentProduct);
			}
			return [
				winningInvestmentProducts,
				losingInvestmentProducts,
			] as InvestmentProductWinLossPartition;
		},
		[[], []] as InvestmentProductWinLossPartition,
	);

export type InvestmentProductWinLossPartition = [
	InvestmentProductNetGain[],
	InvestmentProductNetGain[],
];
