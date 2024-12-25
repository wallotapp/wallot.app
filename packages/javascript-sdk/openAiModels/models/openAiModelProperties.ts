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

export const OpenAiModelCategoryEnum = getEnum(['default']);
export type OpenAiModelCategory = keyof typeof OpenAiModelCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
	'date_published',
	'open_ai_model_family',
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'open_ai_model';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	category: OpenAiModelCategoryEnum.getDefinedSchema(),
	date_published: YupHelpers.dateTime(),
	open_ai_model_family: apiYupHelpers
		.idRef(['open_ai_model_family'])
		.min(1)
		.meta({ unique_key: false }),
} as const;
type U = typeof properties;

export const openAiModelsApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByResourceName[_object],
	properties,
} as const);
export type OpenAiModel = yup.InferType<
	typeof openAiModelsApi.apiResourceJsonSchema
>;
export type CreateOpenAiModelParams = CreateParams<OpenAiModel, T>;
export type UpdateOpenAiModelParams = UpdateParams<OpenAiModel>;
