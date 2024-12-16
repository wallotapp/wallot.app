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

export const StripeCustomerCategoryEnum = getEnum(['default']);
export type StripeCustomerCategory =
	keyof typeof StripeCustomerCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
	'stripe_id',
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'stripe_customer';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	category: StripeCustomerCategoryEnum.getDefinedSchema(),
	stripe_id: yup.string().required(),
} as const;
type U = typeof properties;

export const stripeCustomersApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByCollection[_object],
	properties,
} as const);
export type StripeCustomer = yup.InferType<
	typeof stripeCustomersApi.apiResourceJsonSchema
>;
export type CreateStripeCustomerParams = CreateParams<StripeCustomer, T>;
export type UpdateStripeCustomerParams = UpdateParams<StripeCustomer>;
