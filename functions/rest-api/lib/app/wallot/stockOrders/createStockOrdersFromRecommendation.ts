import { Recommendation, StockOrder } from '@wallot/js';

export const createStockOrdersFromRecommendation = async (
	recommendation: Recommendation,
	{ orderId, userId }: { orderId: string; userId: string },
): Promise<StockOrder[]> => {
	recommendation;
	orderId;
	userId;
	// Wait 1 second
	await new Promise((resolve) => setTimeout(resolve, 2500));
	throw new Error('Not implemented');
};
