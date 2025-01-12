import { Trade } from '../types/InvestmentProductTypes.js';

export const getNumSharesForTrade = (
	{ amount: investmentAmount }: Pick<Trade, 'amount'>,
	sharePrice: string,
): number => {
	const parsedInvestmentAmount = parseFloat(investmentAmount);
	const parsedSharePrice = parseFloat(sharePrice);
	return parsedInvestmentAmount / parsedSharePrice;
};
