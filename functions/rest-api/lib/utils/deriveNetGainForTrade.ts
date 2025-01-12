import { getFutureDate, getNewYorkDate } from '@wallot/js';
import { retrieveAssetPrice } from './retrieveAssetPrice.js';

export const deriveNetGainForTrade = async (
	trade: Trade,
	daysAfterEntry = 30,
): Promise<number> => {
	const entryDate = getNewYorkDate(trade.date);
	const entryAssetPriceParams: [string, string] = [trade.symbol, entryDate];
	const exitAssetPriceParams: [string, string] = [
		trade.symbol,
		getFutureDate(entryDate, daysAfterEntry),
	];
	const [entryAssetPrice, exitAssetPrice] = await Promise.all([
		retrieveAssetPrice(entryAssetPriceParams),
		retrieveAssetPrice(exitAssetPriceParams),
	]);
	throw new Error('Not implemented');
};

type Trade = {
	amount: string; // String number of dollars, e.g. '1000' for $1,000.00
	date: string; // UTC date, e.g. '2024-12-21T01:11:14.887Z'
	symbol: string;
};
