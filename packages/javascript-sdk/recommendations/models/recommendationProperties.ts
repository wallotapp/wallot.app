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
export type RecommendationCategory = keyof typeof RecommendationCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
  ...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'recommendation';
const properties = {
  ...GeneralizedApiResourceProperties,
  _id: apiYupHelpers.id(_object),
  _object: YupHelpers.constant(_object),
  category: RecommendationCategoryEnum.getDefinedSchema(),
	// Add more properties here
} as const;
type U = typeof properties;

export const recommendationsApi = getApiResourceSpec<keyof U, U, T>({
  createParamsRequiredFieldEnum,
  idPrefix: idPrefixByCollection[_object],
	properties,
} as const);
export type Recommendation = yup.InferType<typeof recommendationsApi.apiResourceJsonSchema>;
export type CreateRecommendationParams = CreateParams<Recommendation, T>;
export type UpdateRecommendationParams = UpdateParams<Recommendation>;
