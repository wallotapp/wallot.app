import {
	AssetPrice,
	assetPricesApi,
	getAssetPriceDocumentName,
} from '@wallot/js';
import { db, log } from '../services.js';

/**
 * Retrieve an asset price from the database.
 *
 * @param symbol - The symbol of the asset.
 * @param timestamp - The timestamp of the asset price in the format 'YYYY-MM-DD'.
 */
export const retrieveAssetPrice = async ([symbol, timestamp]: Parameters<
	typeof getAssetPriceDocumentName
>): Promise<AssetPrice> => {
	// Query the database for the asset price
	const name = getAssetPriceDocumentName(symbol, timestamp);
	const assetPriceSnapshot = await db
		.collection(assetPricesApi.collectionId)
		.where('name', '==', name)
		.get();

	// If the asset price doesn't exist, throw an error
	if (assetPriceSnapshot.empty || assetPriceSnapshot.docs[0] == null) {
		const message = 'Query the Alpha Vantage API to get the asset price first.';
		log(
			{
				code: 'MISSING_ASSET_PRICE_ERROR',
				message,
			},
			{ type: 'error' },
		);
		throw new Error(message);
	}

	// If the asset price exists already, return it
	const assetPrice = assetPriceSnapshot.docs[0].data() as AssetPrice;
	return assetPrice;
};
