import { ActivateUserParams, Parameter, Recommendation } from '@wallot/js';
import { locateRecentForecastsProducedByModel } from '../forecasts/locateRecentForecastsProducedByModel.js';
import { locateBestModelFamiliesForParameterSet } from '../models/locateBestModelFamiliesForParameterSet.js';
import { locateLatestModelInModelFamily } from '../models/locateLatestModelInModelFamily.js';
import { promptGptForCustomRecommendation } from './promptGptForCustomRecommendation.js';

export const createRecommendationForUser = async (
	{
		age_range,
		capital_level,
		investing_goals,
		risk_preference,
	}: ActivateUserParams,
	{ userId }: { userId: string },
	compatibleParameters: Parameter[],
): Promise<Recommendation> => {
	// Locate best MODEL_FAMILYs for PARAMETERs
	const bestModelFamilies = await locateBestModelFamiliesForParameterSet({
		age_range,
		capital_level,
		investing_goals,
		risk_preference,
		compatibleParameters,
	});

	// Select the first MODEL_FAMILY
	if (bestModelFamilies.length === 0) {
		throw new Error('No model families found');
	}
	const bestModelFamily = bestModelFamilies[0];

	// Locate latest MODEL in MODEL_FAMILY
	const latestModel = await locateLatestModelInModelFamily({
		model_family: bestModelFamily,
	});

	// Locate recent FORECASTs produced by MODEL
	const forecasts = await locateRecentForecastsProducedByModel({
		model: latestModel,
	});

	// Generate custom RECOMMENDATION for USER from FORECASTs and PARAMETERs
	const customRecommendation = await promptGptForCustomRecommendation({
		age_range,
		capital_level,
		investing_goals,
		risk_preference,
		userId,
		compatibleParameters,
		forecasts,
	});

	return customRecommendation;
};
