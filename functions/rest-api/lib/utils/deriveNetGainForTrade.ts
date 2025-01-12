import {
	TradeNetGain,
	TradeNetGainResults,
	Trade,
	getFutureDate,
	getNewYorkDate,
	getNumSharesForTrade,
} from '@wallot/js';
import { retrieveAssetPrice } from './retrieveAssetPrice.js';
import { log } from '../services.js';

export const deriveNetGainForTrade = async (
	trade: Trade,
	daysAfterEntry = 30,
): Promise<TradeNetGain> => {
	const entryDate = getNewYorkDate(trade.date);
	const exitDate = getFutureDate(entryDate, daysAfterEntry);
	const entryAssetPriceParams: [string, string] = [trade.symbol, entryDate];
	const exitAssetPriceParams: [string, string] = [trade.symbol, exitDate];
	const [
		{ close: entrySharePriceStringInDollars },
		{ close: exitSharePriceStringInDollars },
	] = await Promise.all([
		retrieveAssetPrice(entryAssetPriceParams),
		retrieveAssetPrice(exitAssetPriceParams),
	]);

	if (
		entrySharePriceStringInDollars == null ||
		exitSharePriceStringInDollars == null
	) {
		const message = 'Fix the asset price data in the database.';
		log(
			{
				code: 'MISSING_CLOSE_PRICE_IN_ASSET_PRICE_ERROR',
				message,
				trade,
				daysAfterEntry,
				entryDate,
				exitDate,
			},
			{ type: 'error' },
		);
		throw new Error(message);
	}

	const entryNumShares = getNumSharesForTrade(
		trade,
		entrySharePriceStringInDollars,
	);
	const entryAggregatePriceInDollars = parseFloat(trade.amount);
	const exitSharePriceInDollars = parseFloat(exitSharePriceStringInDollars);
	const exitAggregatePriceInDollars = entryNumShares * exitSharePriceInDollars;
	const netGain = exitAggregatePriceInDollars - entryAggregatePriceInDollars;
	const netGainRate = netGain / entryAggregatePriceInDollars;
	const results: TradeNetGainResults = {
		num_shares: entryNumShares,
		entry_date: entryDate,
		days_held: daysAfterEntry,
		exit_date: exitDate,
		entry_aggregate_price: entryAggregatePriceInDollars * 100,
		entry_share_price: parseFloat(entrySharePriceStringInDollars) * 100,
		exit_aggregate_price: exitAggregatePriceInDollars * 100,
		exit_share_price: exitSharePriceInDollars * 100,
		net_gain: netGain * 100,
		net_gain_rate: netGainRate,
		summary: netGain > 0 ? 'win' : 'loss',
	};
	return { trade, results };
};
