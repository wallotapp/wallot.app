import {
	InvestmentProduct,
	InvestmentProductNetGain,
	InvestmentProductNetGainResults,
	TradeNetGain,
} from '@wallot/js';
import { deriveNetGainForTrade } from './deriveNetGainForTrade.js';

export const deriveNetGainForInvestmentProduct = async (
	investmentProduct: InvestmentProduct,
	daysAfterEntry = 30,
): Promise<InvestmentProductNetGain> => {
	const tradeNetGains: TradeNetGain[] = await Promise.all(
		investmentProduct.trades.map((trade) =>
			deriveNetGainForTrade(trade, daysAfterEntry),
		),
	);

	const firstTradeNetGain = tradeNetGains[0];
	if (firstTradeNetGain == null) {
		throw new Error('No trades');
	}

	const globalEntryPrice = tradeNetGains.reduce(
		(acc, curr) => acc + curr.results.entry_aggregate_price,
		0,
	);
	const globalExitPrice = tradeNetGains.reduce(
		(acc, curr) => acc + curr.results.exit_aggregate_price,
		0,
	);
	const globalNetGain = globalExitPrice - globalEntryPrice;
	const globalNetGainRate = globalNetGain / globalEntryPrice;
	const globalWin = globalNetGain > 0;

	const results: InvestmentProductNetGainResults = {
		entry_date: firstTradeNetGain.results.entry_date,
		exit_date: firstTradeNetGain.results.exit_date,
		days_held: firstTradeNetGain.results.days_held,
		// USD in cents
		entry_aggregate_price: globalEntryPrice,
		exit_aggregate_price: globalExitPrice,
		net_gain: globalNetGain,
		// Decimal (e.g. 0.1 for 10%)
		net_gain_rate: globalNetGainRate,
		// Flag for win or loss
		win: globalWin,
	};

	return {
		investment_product: {
			...investmentProduct,
			trades: tradeNetGains,
		},
		results,
	};
};
