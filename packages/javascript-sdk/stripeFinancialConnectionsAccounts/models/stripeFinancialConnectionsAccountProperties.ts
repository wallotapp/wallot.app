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

export const StripeFinancialConnectionsAccountCategoryEnum = getEnum([
	'default',
]);
export type StripeFinancialConnectionsAccountCategory =
	keyof typeof StripeFinancialConnectionsAccountCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'stripe_financial_connections_account';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	category: StripeFinancialConnectionsAccountCategoryEnum.getDefinedSchema(),
	// Add more properties here
} as const;
type U = typeof properties;

export const stripeFinancialConnectionsAccountsApi = getApiResourceSpec<
	keyof U,
	U,
	T
>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByCollection[_object],
	properties,
} as const);
export type StripeFinancialConnectionsAccount = yup.InferType<
	typeof stripeFinancialConnectionsAccountsApi.apiResourceJsonSchema
>;
export type CreateStripeFinancialConnectionsAccountParams = CreateParams<
	StripeFinancialConnectionsAccount,
	T
>;
export type UpdateStripeFinancialConnectionsAccountParams =
	UpdateParams<StripeFinancialConnectionsAccount>;
