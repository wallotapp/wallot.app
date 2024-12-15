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

export const StripeFinancialConnectionAccountCategoryEnum = getEnum([
	'default',
]);
export type StripeFinancialConnectionAccountCategory =
	keyof typeof StripeFinancialConnectionAccountCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'stripe_financial_connection_account';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	category: StripeFinancialConnectionAccountCategoryEnum.getDefinedSchema(),
	// Add more properties here
} as const;
type U = typeof properties;

export const stripeFinancialConnectionAccountsApi = getApiResourceSpec<
	keyof U,
	U,
	T
>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByCollection[_object],
	properties,
} as const);
export type StripeFinancialConnectionAccount = yup.InferType<
	typeof stripeFinancialConnectionAccountsApi.apiResourceJsonSchema
>;
export type CreateStripeFinancialConnectionAccountParams = CreateParams<
	StripeFinancialConnectionAccount,
	T
>;
export type UpdateStripeFinancialConnectionAccountParams =
	UpdateParams<StripeFinancialConnectionAccount>;
