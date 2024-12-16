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

export const EquityAccountCategoryEnum = getEnum(['default']);
export type EquityAccountCategory = keyof typeof EquityAccountCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
	'user',
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'equity_account';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	category: EquityAccountCategoryEnum.getDefinedSchema(),
	user: apiYupHelpers.idRef(['user']).min(1),
} as const;
type U = typeof properties;

export const equityAccountsApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByCollection[_object],
	properties,
} as const);
export type EquityAccount = yup.InferType<
	typeof equityAccountsApi.apiResourceJsonSchema
>;
export type CreateEquityAccountParams = CreateParams<EquityAccount, T>;
export type UpdateEquityAccountParams = UpdateParams<EquityAccount>;
