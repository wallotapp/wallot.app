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
	const [{ close: entryClosePrice }, { close: exitClosePrice }] =
		await Promise.all([
			retrieveAssetPrice(entryAssetPriceParams),
			retrieveAssetPrice(exitAssetPriceParams),
		]);

	if (entryClosePrice == null || exitClosePrice == null) {
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

	const entryNumShares = getNumSharesForTrade(trade, entryClosePrice);
	const entryTotalPrice = entryNumShares * parseFloat(entryClosePrice);
	const exitTotalPrice = entryNumShares * parseFloat(exitClosePrice);
	const netGain = exitTotalPrice - entryTotalPrice;
	const netGainRate = netGain / entryTotalPrice;
	return {
		num_shares: entryNumShares,
		entry_date: entryDate,
		entry_price: parseFloat(entryClosePrice),
		exit_date: exitDate,
		exit_price: parseFloat(exitClosePrice),
		net_gain: netGain,
		net_gain_rate: netGainRate,
	};
};
