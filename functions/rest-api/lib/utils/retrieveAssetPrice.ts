import {
	AssetPrice,
	assetPricesApi,
	getAssetPriceDocumentName,
} from '@wallot/js';
import { alphaVantage, db, log } from '../services.js';

export const retrieveAssetPrice = async ([symbol, timestamp]: Parameters<
	typeof getAssetPriceDocumentName
>): Promise<AssetPrice> => {
	try {
		// Query the database for the asset price
		const name = getAssetPriceDocumentName(symbol, timestamp);
		const assetPriceSnapshot = await db
			.collection(assetPricesApi.collectionId)
			.where('name', '==', name)
			.get();

		// If the asset price doesn't exist, query the Alpha Vantage API
		if (assetPriceSnapshot.empty || assetPriceSnapshot.docs[0] == null) {
			throw new Error('Alpha Vantage API not implemented');
		}

		// If the asset price exists already, return it
		const assetPrice = assetPriceSnapshot.docs[0].data() as AssetPrice;
		return assetPrice;
	} catch (error) {
		log({ error }, { type: 'error' });
		throw new Error('Failed to retrieve asset price');
	}
};
