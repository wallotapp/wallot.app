import * as yup from 'yup';
import { GeneralizedApiResourceCreateParamsRequiredFieldEnum, GeneralizedApiResourceProperties, CreateParams, UpdateParams, YupHelpers, getApiResourceSpec, getEnum } from 'ergonomic';
import { apiYupHelpers, idPrefixByResourceName } from '../../utils/apiYupHelpers.js';

export const ModelFamilyCategoryEnum = getEnum(['default']);
export type ModelFamilyCategory = keyof typeof ModelFamilyCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr, 'parameters'] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'model_family';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	category: ModelFamilyCategoryEnum.getDefinedSchema(),
	parameters: apiYupHelpers.idRefs(['parameter']).min(1),
} as const;
type U = typeof properties;

export const modelFamiliesApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByResourceName[_object],
	properties,
	resourceNamePlural: 'model_families',
} as const);
export type ModelFamily = yup.InferType<typeof modelFamiliesApi.apiResourceJsonSchema>;
export type CreateModelFamilyParams = CreateParams<ModelFamily, T>;
export type UpdateModelFamilyParams = UpdateParams<ModelFamily>;
