import { Recommendation } from '@wallot/js';

export const createStockOrdersFromRecommendation = async (
	recommendation: Recommendation,
	{ orderId, userId }: { orderId: string; userId: string },
): Promise<Recommendation> => {
	recommendation;
	orderId;
	userId;
	// Wait 1 second
	await new Promise((resolve) => setTimeout(resolve, 2500));
	throw new Error('Not implemented');
};
