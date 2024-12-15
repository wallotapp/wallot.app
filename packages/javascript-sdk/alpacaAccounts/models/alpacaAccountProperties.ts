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

export const AlpacaAccountCategoryEnum = getEnum(['default']);
export type AlpacaAccountCategory = keyof typeof AlpacaAccountCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'alpaca_account';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	category: AlpacaAccountCategoryEnum.getDefinedSchema(),
	// Add more properties here
} as const;
type U = typeof properties;

export const alpacaAccountsApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByCollection[_object],
	properties,
} as const);
export type AlpacaAccount = yup.InferType<
	typeof alpacaAccountsApi.apiResourceJsonSchema
>;
export type CreateAlpacaAccountParams = CreateParams<AlpacaAccount, T>;
export type UpdateAlpacaAccountParams = UpdateParams<AlpacaAccount>;
