import * as yup from 'yup';
import {
	GeneralizedApiResourceCreateParamsRequiredFieldEnum,
	GeneralizedApiResourceProperties,
	CreateParams,
	UpdateParams,
	YupHelpers,
	getApiResourceSpec,
	getEnum,
} from 'ergonomic';
import {
	apiYupHelpers,
	idPrefixByCollection,
} from '../../utils/apiYupHelpers.js';

export const RecommendationCategoryEnum = getEnum(['default']);
export type RecommendationCategory =
	keyof typeof RecommendationCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
	'forecasts',
	'model',
	'open_ai_recommendation',
	'parameters',
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'recommendation';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	category: RecommendationCategoryEnum.getDefinedSchema(),
	forecasts: apiYupHelpers.idRefs(['forecast']).min(1),
	model: apiYupHelpers.idRef(['model']).min(1).meta({ unique_key: false }),
	open_ai_recommendation: apiYupHelpers
		.idRef(['open_ai_recommendation'])
		.min(1)
		.meta({ unique_key: true }),
	parameters: apiYupHelpers.idRefs(['parameter']).min(1),
	user: apiYupHelpers
		.idRef(['user'])
		.default(null)
		.nullable()
		.meta({ unique_key: false }),
} as const;
type U = typeof properties;

export const recommendationsApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByCollection[_object],
	properties,
} as const);
export type Recommendation = yup.InferType<
	typeof recommendationsApi.apiResourceJsonSchema
>;
export type CreateRecommendationParams = CreateParams<Recommendation, T>;
export type UpdateRecommendationParams = UpdateParams<Recommendation>;
