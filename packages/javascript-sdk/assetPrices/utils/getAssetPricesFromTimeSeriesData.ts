import { Asset } from '../../assets/models/assetProperties.js';
import {
	AssetPrice,
	CreateAssetPriceParams,
	assetPricesApi,
} from '../models/assetPriceProperties.js';
import { AlphaVantageDailyTimeSeriesResponse } from '../types/AlphaVantageTimeSeriesApiTypes.js';
import { getAssetPriceDocumentName } from './getAssetPriceDocumentName.js';

export const getAssetPricesFromTimeSeriesData = (
	asset: Pick<Asset, '_id' | 'symbol'>,
	timeSeriesData: AlphaVantageDailyTimeSeriesResponse,
): AssetPrice[] => {
	const timeSeries = timeSeriesData['Time Series (Daily)'];
	const metadata = timeSeriesData['Meta Data'];
	const assetPrices: AssetPrice[] = [];

	for (const [timestamp, priceData] of Object.entries(timeSeries)) {
		const params: CreateAssetPriceParams = {
			adjusted_close: priceData['5. adjusted close'],
			asset: asset._id,
			category: 'daily_ohlcv',
			close: priceData['4. close'],
			dividend_amount: priceData['7. dividend amount'],
			high: priceData['2. high'],
			low: priceData['3. low'],
			name: getAssetPriceDocumentName(asset.symbol, timestamp),
			open: priceData['1. open'],
			split_coefficient: priceData['8. split coefficient'],
			symbol: asset.symbol,
			timestamp,
			time_zone: metadata['5. Time Zone'],
			volume: priceData['6. volume'],
		};
		const assetPrice = assetPricesApi.mergeCreateParams({
			createParams: params,
		});
		assetPrices.push(assetPrice);
	}

	return assetPrices;
};
