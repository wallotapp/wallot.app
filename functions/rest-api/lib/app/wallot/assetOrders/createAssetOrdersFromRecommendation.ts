import { Recommendation, CreateAssetOrderParams, AssetOrder, assetOrdersApi, assetsApi } from '@wallot/js';
import { db } from '../../../services.js';

export const createAssetOrdersFromRecommendation = async ({ orderId, recommendation }: { orderId: string; recommendation: Recommendation }): Promise<AssetOrder[]> => {
	const { best_investments } = recommendation;

	if (!best_investments || best_investments.length === 0) {
		throw new Error('No best orders found');
	}

	const assetOrdersPromises = best_investments.map(async (order) => {
		const { amount, side, symbol } = order;

		// Fetch asset information from Firestore
		const assetCollectionId = assetsApi.collectionId;
		const assetQuerySnapshot = await db.collection(assetCollectionId).where('symbol', '==', symbol).get();

		if (assetQuerySnapshot.empty) {
			throw new Error(`Asset not found for symbol: ${symbol}`);
		}

		const assetDoc = assetQuerySnapshot.docs[0];
		if (!assetDoc) {
			throw new Error(`Asset not found for symbol: ${symbol}`);
		}

		const amountUsdCents = parseInt(amount) * 100;

		// Construct parameters for creating the asset order
		const params: CreateAssetOrderParams = {
			alpaca_order_side: side,
			alpaca_order_symbol: symbol,
			amount: amountUsdCents,
			asset: assetDoc.id,
			category: 'default',
			name: '',
			order: orderId,
			recommendations: [recommendation._id],
		};

		// Merge the params to create an asset order
		return assetOrdersApi.mergeCreateParams({ createParams: params });
	});

	// Wait for all promises to resolve
	const assetOrdersMappedFromRecommendationBestChoices = await Promise.all(assetOrdersPromises);

	return assetOrdersMappedFromRecommendationBestChoices;
};
