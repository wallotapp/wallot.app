import {
	Recommendation,
	CreateAssetOrderParams,
	AssetOrder,
	assetOrdersApi,
	assetsApi,
} from '@wallot/js';
import { db } from '../../../services.js';

export const createAssetOrdersFromRecommendation = async (
	recommendation: Recommendation,
	{ orderId }: { orderId: string },
): Promise<AssetOrder[]> => {
	const { best_orders } = recommendation;
	const order = best_orders[0];
	if (!order) {
		throw new Error('No best order found');
	}
	const { amount, side, symbol } = order;
	const assetCollectionId = assetsApi.collectionId;
	const assetQuerySnapshot = await db
		.collection(assetCollectionId)
		.where('symbol', '==', symbol)
		.get();
	if (assetQuerySnapshot.empty) {
		throw new Error('Asset not found');
	}
	const assetDoc = assetQuerySnapshot.docs[0];
	if (!assetDoc) {
		throw new Error('Asset not found');
	}
	const amountUsdCents = parseInt(amount) * 100;
	const params: CreateAssetOrderParams = {
		alpaca_order_side: side,
		amount: amountUsdCents,
		asset: assetDoc.id,
		order: orderId,
		category: 'default',
		name: '',
		recommendations: [recommendation._id],
	};
	const assetOrdersMappedFromRecommendationBestChoices: AssetOrder[] = [
		assetOrdersApi.mergeCreateParams({ createParams: params }),
	];
	return assetOrdersMappedFromRecommendationBestChoices;
};
