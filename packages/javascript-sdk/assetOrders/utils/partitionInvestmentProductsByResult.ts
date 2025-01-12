import {
	TradeNetGain,
	InvestmentProductNetGain,
} from '../types/InvestmentProductTypes.js';

export const partitionTradesByResult = (investmentProducts: TradeNetGain[]) =>
	investmentProducts.reduce(
		([winningTrades, losingTrades], investmentProduct) => {
			if (investmentProduct.results.summary === 'win') {
				winningTrades.push(investmentProduct);
			} else {
				losingTrades.push(investmentProduct);
			}
			return [winningTrades, losingTrades] as TradeWinLossPartition;
		},
		[[], []] as TradeWinLossPartition,
	);

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

export type TradeWinLossPartition = [TradeNetGain[], TradeNetGain[]];
export type InvestmentProductWinLossPartition = [
	InvestmentProductNetGain[],
	InvestmentProductNetGain[],
];
