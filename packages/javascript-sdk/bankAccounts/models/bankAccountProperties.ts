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

export const BankAccountCategoryEnum = getEnum(['default']);
export type BankAccountCategory = keyof typeof BankAccountCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
	'stripe_financial_connection_account',
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'bank_account';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	alpaca_ach_relationship: apiYupHelpers
		.idRef(['alpaca_ach_relationship'])
		.default(null)
		.nullable()
		.meta({ unique_key: true }),
	category: BankAccountCategoryEnum.getDefinedSchema(),
	stripe_financial_connection_account: apiYupHelpers
		.idRef(['stripe_financial_connection_account'])
		.min(1)
		.meta({ unique_key: true }),
} as const;
type U = typeof properties;

export const bankAccountsApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByResourceName[_object],
	properties,
} as const);
export type BankAccount = yup.InferType<
	typeof bankAccountsApi.apiResourceJsonSchema
>;
export type CreateBankAccountParams = CreateParams<BankAccount, T>;
export type UpdateBankAccountParams = UpdateParams<BankAccount>;
