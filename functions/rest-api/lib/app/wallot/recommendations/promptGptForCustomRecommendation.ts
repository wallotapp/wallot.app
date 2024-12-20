import { Recommendation } from '@wallot/js';

export type PromptGptForCustomRecommendationParams = unknown;
export const promptGptForCustomRecommendation = async (
	params: PromptGptForCustomRecommendationParams,
): Promise<Recommendation> => {
	// Locate pertinent NEWS_REPORTs
	// Locate pertinent ASSET_PRICEs
	// Construct RECOMMENDATION

	params;
	// Wait 1 second
	await new Promise((resolve) => setTimeout(resolve, 2500));
	throw new Error('Not implemented');
};
