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

export const AlphaVantageCompanyCategoryEnum = getEnum(['default']);
export type AlphaVantageCompanyCategory =
	keyof typeof AlphaVantageCompanyCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'alpha_vantage_company';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	category: AlphaVantageCompanyCategoryEnum.getDefinedSchema(),
	// Add more properties here
} as const;
type U = typeof properties;

export const alphaVantageCompaniesApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByCollection[_object],
	properties,
} as const);
export type AlphaVantageCompany = yup.InferType<
	typeof alphaVantageCompaniesApi.apiResourceJsonSchema
>;
export type CreateAlphaVantageCompanyParams = CreateParams<
	AlphaVantageCompany,
	T
>;
export type UpdateAlphaVantageCompanyParams = UpdateParams<AlphaVantageCompany>;
