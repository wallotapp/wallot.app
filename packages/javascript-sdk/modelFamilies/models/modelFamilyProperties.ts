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

export const ModelFamilyCategoryEnum = getEnum(['default']);
export type ModelFamilyCategory = keyof typeof ModelFamilyCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
	'open_ai_model_family',
	'parameters',
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'model_family';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	category: ModelFamilyCategoryEnum.getDefinedSchema(),
	open_ai_model_family: apiYupHelpers
		.idRef(['open_ai_model_family'])
		.min(1)
		.meta({ unique_key: true }),
	parameters: apiYupHelpers.idRefs(['parameter']).min(1),
} as const;
type U = typeof properties;

export const modelFamiliesApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByCollection[_object],
	properties,
} as const);
export type ModelFamily = yup.InferType<
	typeof modelFamiliesApi.apiResourceJsonSchema
>;
export type CreateModelFamilyParams = CreateParams<ModelFamily, T>;
export type UpdateModelFamilyParams = UpdateParams<ModelFamily>;
