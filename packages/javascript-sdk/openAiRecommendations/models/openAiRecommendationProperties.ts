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
	idPrefixByResourceName,
} from '../../utils/apiYupHelpers.js';

export const OpenAiRecommendationCategoryEnum = getEnum(['default']);
export type OpenAiRecommendationCategory =
	keyof typeof OpenAiRecommendationCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'open_ai_recommendation';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	category: OpenAiRecommendationCategoryEnum.getDefinedSchema(),
	// Add more properties here
} as const;
type U = typeof properties;

export const openAiRecommendationsApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByResourceName[_object],
	properties,
} as const);
export type OpenAiRecommendation = yup.InferType<
	typeof openAiRecommendationsApi.apiResourceJsonSchema
>;
export type CreateOpenAiRecommendationParams = CreateParams<
	OpenAiRecommendation,
	T
>;
export type UpdateOpenAiRecommendationParams =
	UpdateParams<OpenAiRecommendation>;
