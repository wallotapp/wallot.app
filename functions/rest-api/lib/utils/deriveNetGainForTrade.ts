import { getFutureDate, getNewYorkDate } from '@wallot/js';
import { retrieveAssetPrice } from './retrieveAssetPrice.js';
import { log } from '../services.js';

export const deriveNetGainForTrade = async (
	trade: Trade,
	daysAfterEntry = 30,
): Promise<NetGain> => {
	const entryDate = getNewYorkDate(trade.date);
	const exitDate = getFutureDate(entryDate, daysAfterEntry);
	const entryAssetPriceParams: [string, string] = [trade.symbol, entryDate];
	const exitAssetPriceParams: [string, string] = [trade.symbol, exitDate];
	const [{ close: entryClose }, { close: exitClose }] = await Promise.all([
		retrieveAssetPrice(entryAssetPriceParams),
		retrieveAssetPrice(exitAssetPriceParams),
	]);

	if (entryClose == null || exitClose == null) {
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

	const entryNumShares = getNumShares(trade.amount, entryClose);
	const entryTotalPrice = entryNumShares * parseFloat(entryClose);
	const exitTotalPrice = entryNumShares * parseFloat(exitClose);
	const netGain = exitTotalPrice - entryTotalPrice;
	const netGainRate = netGain / entryTotalPrice;
	return {
		num_shares: entryNumShares,
		entry_date: entryDate,
		entry_price: parseFloat(entryClose),
		exit_date: exitDate,
		exit_price: parseFloat(exitClose),
		net_gain: netGain,
		net_gain_rate: netGainRate,
	};
};

type Trade = {
	amount: string; // String number of dollars, e.g. '1000' for $1,000.00
	date: string; // UTC date, e.g. '2024-12-21T01:11:14.887Z'
	symbol: string;
};
type NetGain = {
	num_shares: number;
	entry_date: string;
	entry_price: number;
	exit_date: string;
	exit_price: number;
	net_gain: number;
	net_gain_rate: number;
};

function getNumShares(amount: string, price: string): number {
	const amountNum = parseFloat(amount);
	const priceNum = parseFloat(price);
	return amountNum / priceNum;
}
