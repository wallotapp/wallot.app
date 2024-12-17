import { ActivateUserParams, Parameter, Recommendation } from '@wallot/js';

export const createRecommendationForUser = async (
	{ age_range, capital_level, investing_goals, risk_level }: ActivateUserParams,
	compatibleParameters: Parameter[],
): Promise<Recommendation> => {
	age_range;
	capital_level;
	investing_goals;
	risk_level;
	compatibleParameters;
	// Wait 1 second
	await new Promise((resolve) => setTimeout(resolve, 2500));
	throw new Error('Not implemented');
};
