import { ActivateUserParams, Parameter, Recommendation } from '@wallot/js';
import { locateBestModelFamiliesForParameterSet } from '../models/locateBestModelFamiliesForParameterSet.js';
import { locateLatestModelInModelFamily } from '../models/locateLatestModelInModelFamily.js';
import { promptGptForCustomRecommendation } from './promptGptForCustomRecommendation.js';

export const createRecommendationForUser = async ({
	age_range,
	capital_level,
	investing_goals,
	risk_preference,
	userId,
	compatibleParameters,
}: ActivateUserParams & {
	userId: string;
	compatibleParameters: Parameter[];
}): Promise<Recommendation> => {
	// Locate best MODEL_FAMILYs for PARAMETERs
	const bestModelFamilies = await locateBestModelFamiliesForParameterSet({
		age_range,
		capital_level,
		investing_goals,
		risk_preference,
		compatibleParameters,
	});

	// Select the first MODEL_FAMILY
	const bestModelFamily = bestModelFamilies[0];
	if (bestModelFamily == null) {
		throw new Error('No model family found');
	}

	// Locate latest MODEL in MODEL_FAMILY
	const latestModel = await locateLatestModelInModelFamily({
		modelFamily: bestModelFamily,
	});

	// Generate custom RECOMMENDATION for USER
	const customRecommendation = await promptGptForCustomRecommendation({
		age_range,
		capital_level,
		investing_goals,
		risk_preference,
		userId,
		model: latestModel,
	});

	return customRecommendation;
};
