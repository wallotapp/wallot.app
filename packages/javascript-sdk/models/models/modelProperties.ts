import * as yup from 'yup';
import { GeneralizedApiResourceCreateParamsRequiredFieldEnum, GeneralizedApiResourceProperties, CreateParams, UpdateParams, YupHelpers, getApiResourceSpec, getEnum } from 'ergonomic';
import { apiYupHelpers, idPrefixByResourceName } from '../../utils/apiYupHelpers.js';

export const ModelCategoryEnum = getEnum(['default']);
export type ModelCategory = keyof typeof ModelCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr, 'date_published', 'model_family', 'open_ai_model'] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'model';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	category: ModelCategoryEnum.getDefinedSchema(),
	date_published: YupHelpers.dateTime(),
	name: GeneralizedApiResourceProperties.name.meta({ unique_key: true }),
	model_family: apiYupHelpers.idRef(['model_family']).min(1).meta({ unique_key: false }),
	open_ai_model: apiYupHelpers.idRef(['open_ai_model']).min(1).meta({ unique_key: true }),
} as const;
type U = typeof properties;

export const modelsApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByResourceName[_object],
	properties,
} as const);
export type Model = yup.InferType<typeof modelsApi.apiResourceJsonSchema>;
export type CreateModelParams = CreateParams<Model, T>;
export type UpdateModelParams = UpdateParams<Model>;
