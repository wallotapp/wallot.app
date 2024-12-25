import * as yup from 'yup';
import { GeneralizedApiResourceCreateParamsRequiredFieldEnum, GeneralizedApiResourceProperties, CreateParams, UpdateParams, YupHelpers, getApiResourceSpec, getEnum } from 'ergonomic';
import { apiYupHelpers, idPrefixByResourceName } from '../../utils/apiYupHelpers.js';

export const OpenAiModelFamilyCategoryEnum = getEnum(['default']);
export type OpenAiModelFamilyCategory = keyof typeof OpenAiModelFamilyCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'open_ai_model_family';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	category: OpenAiModelFamilyCategoryEnum.getDefinedSchema(),
	// Add more properties here
} as const;
type U = typeof properties;

export const openAiModelFamiliesApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByResourceName[_object],
	properties,
	resourceNamePlural: 'open_ai_model_families',
} as const);
export type OpenAiModelFamily = yup.InferType<typeof openAiModelFamiliesApi.apiResourceJsonSchema>;
export type CreateOpenAiModelFamilyParams = CreateParams<OpenAiModelFamily, T>;
export type UpdateOpenAiModelFamilyParams = UpdateParams<OpenAiModelFamily>;
