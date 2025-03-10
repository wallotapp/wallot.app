import {
	InvestmentProduct,
	InvestmentProductNetGain,
	InvestmentProductNetGainResults,
	partitionTradesByResult,
	TradeNetGain,
} from '@wallot/js';
import { deriveNetGainForTrade } from './deriveNetGainForTrade.js';
import { v4 } from 'uuid';

export const deriveNetGainForInvestmentProduct = async (
	investmentProduct: InvestmentProduct,
	daysAfterEntry = 30,
	id: string | null = null,
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

	const [winners, losers] = partitionTradesByResult(tradeNetGains);
	const hitRate = winners.length / tradeNetGains.length;

	const numWinners = winners.length;
	const averageNetGainForWinners =
		numWinners === 0
			? null
			: winners.reduce((acc, curr) => acc + curr.results.net_gain, 0) /
			  numWinners;
	const averageNetGainRateForWinners =
		numWinners === 0
			? null
			: winners.reduce((acc, curr) => acc + curr.results.net_gain_rate, 0) /
			  numWinners;
	const numLosers = losers.length;
	const averageNetLossForLosers =
		numLosers === 0
			? null
			: losers.reduce((acc, curr) => acc + curr.results.net_gain, 0) /
			  numLosers;
	const averageNetLossRateForLosers =
		numLosers === 0
			? null
			: losers.reduce((acc, curr) => acc + curr.results.net_gain_rate, 0) /
			  numLosers;

	const results: InvestmentProductNetGainResults = {
		// == Performance == //
		entry_date: firstTradeNetGain.results.entry_date,
		exit_date: firstTradeNetGain.results.exit_date,
		days_held: firstTradeNetGain.results.days_held,
		entry_aggregate_price: globalEntryPrice,
		exit_aggregate_price: globalExitPrice,
		net_gain: globalNetGain,
		net_gain_rate: globalNetGainRate,
		// == Performance Summary == //
		summary: globalNetGain > 0 ? 'win' : 'loss',
		num_winners: numWinners,
		num_losers: numLosers,
		hit_rate: hitRate,
		average_net_gain_for_winners: averageNetGainForWinners,
		average_net_gain_rate_for_winners: averageNetGainRateForWinners,
		average_net_loss_for_losers: averageNetLossForLosers,
		average_net_loss_rate_for_losers: averageNetLossRateForLosers,
	};

	return {
		id: id ?? v4(),
		investment_product: {
			...investmentProduct,
			trades: tradeNetGains,
		},
		results,
	};
};
