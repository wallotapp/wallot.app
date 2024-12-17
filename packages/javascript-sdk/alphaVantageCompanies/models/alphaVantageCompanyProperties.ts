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
	idPrefix: idPrefixByResourceName[_object],
	properties,
	resourceNamePlural: 'alpha_vantage_companies',
} as const);
export type AlphaVantageCompany = yup.InferType<
	typeof alphaVantageCompaniesApi.apiResourceJsonSchema
>;
export type CreateAlphaVantageCompanyParams = CreateParams<
	AlphaVantageCompany,
	T
>;
export type UpdateAlphaVantageCompanyParams = UpdateParams<AlphaVantageCompany>;
