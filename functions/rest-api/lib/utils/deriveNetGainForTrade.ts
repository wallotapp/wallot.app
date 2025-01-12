import {
	NetGain,
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

	const entryNumShares = getNumSharesForTrade(trade, entryClose);
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
