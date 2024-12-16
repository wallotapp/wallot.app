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

export const PaymentMethodCategoryEnum = getEnum(['default']);
export type PaymentMethodCategory = keyof typeof PaymentMethodCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
	'bank_account',
	'user',
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'payment_method';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	bank_account: apiYupHelpers
		.idRef(['bank_account'])
		.min(1)
		.meta({ unique_key: true }),
	category: PaymentMethodCategoryEnum.getDefinedSchema(),
	stripe_payment_method: apiYupHelpers
		.idRef(['stripe_payment_method'])
		.default(null)
		.nullable()
		.meta({ unique_key: true }),
	user: apiYupHelpers.idRef(['user']).min(1).meta({ unique_key: false }),
} as const;
type U = typeof properties;

export const paymentMethodsApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByCollection[_object],
	properties,
} as const);
export type PaymentMethod = yup.InferType<
	typeof paymentMethodsApi.apiResourceJsonSchema
>;
export type CreatePaymentMethodParams = CreateParams<PaymentMethod, T>;
export type UpdatePaymentMethodParams = UpdateParams<PaymentMethod>;
