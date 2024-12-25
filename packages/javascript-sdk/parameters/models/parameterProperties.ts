import * as yup from 'yup';
import { GeneralizedApiResourceCreateParamsRequiredFieldEnum, GeneralizedApiResourceProperties, CreateParams, UpdateParams, YupHelpers, getApiResourceSpec, getEnum } from 'ergonomic';
import { apiYupHelpers, idPrefixByResourceName } from '../../utils/apiYupHelpers.js';

export const ParameterCategoryEnum = getEnum(['age_range', 'capital_level', 'investment_goal', 'risk_preference']);
export type ParameterCategory = keyof typeof ParameterCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr, 'values'] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'parameter';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	category: ParameterCategoryEnum.getDefinedSchema(),
	values: YupHelpers.array(yup.string().defined()).defined().min(1),
} as const;
type U = typeof properties;

export const parametersApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByResourceName[_object],
	properties,
} as const);
export type Parameter = yup.InferType<typeof parametersApi.apiResourceJsonSchema>;
export type CreateParameterParams = CreateParams<Parameter, T>;
export type UpdateParameterParams = UpdateParams<Parameter>;
