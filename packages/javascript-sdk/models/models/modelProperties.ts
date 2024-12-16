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

export const ModelCategoryEnum = getEnum(['default']);
export type ModelCategory = keyof typeof ModelCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
	'model_family',
	'open_ai_model',
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'model';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	category: ModelCategoryEnum.getDefinedSchema(),
	model_family: apiYupHelpers.idRef(['model_family']).min(1),
	open_ai_model: apiYupHelpers.idRef(['open_ai_model']).min(1),
} as const;
type U = typeof properties;

export const modelsApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByCollection[_object],
	properties,
} as const);
export type Model = yup.InferType<typeof modelsApi.apiResourceJsonSchema>;
export type CreateModelParams = CreateParams<Model, T>;
export type UpdateModelParams = UpdateParams<Model>;
