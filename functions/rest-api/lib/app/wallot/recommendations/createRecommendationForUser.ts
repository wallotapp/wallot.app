import { ActivateUserParams, Parameter, Recommendation } from '@wallot/js';
import { locateRecentForecastsProducedByModel } from '../forecasts/locateRecentForecastsProducedByModel.js';
import { locateBestModelFamilyForParameterSet } from '../models/locateBestModelFamilyForParameterSet.js';
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
	// Locate best MODEL_FAMILY for PARAMETERs
	const bestModelFamily = await locateBestModelFamilyForParameterSet({
		age_range,
		capital_level,
		investing_goals,
		risk_preference,
		compatibleParameters,
	});

	// Locate latest MODEL in MODEL_FAMILY
	const latestModel = await locateLatestModelInModelFamily({
		model_family: bestModelFamily,
	});

	// Locate recent FORECASTs produced by MODEL
	const forecasts = await locateRecentForecastsProducedByModel({
		model: latestModel,
	});

	// Generate custom RECOMMENDATION for USER from FORECASTs and PARAMETERs
	const customRecommendation = (await promptGptForCustomRecommendation({
		age_range,
		capital_level,
		investing_goals,
		risk_preference,
		userId,
		compatibleParameters,
		forecasts,
	})) as Recommendation;

	return customRecommendation;
};
