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

export const OrderCategoryEnum = getEnum(['default']);
export type OrderCategory = keyof typeof OrderCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
	'user',
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'order';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	bank_account: apiYupHelpers.idRef(['bank_account']).default(null).nullable(),
	category: OrderCategoryEnum.getDefinedSchema(),
	user: apiYupHelpers.idRef(['user']).min(1),
} as const;
type U = typeof properties;

export const ordersApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByCollection[_object],
	properties,
} as const);
export type Order = yup.InferType<typeof ordersApi.apiResourceJsonSchema>;
export type CreateOrderParams = CreateParams<Order, T>;
export type UpdateOrderParams = UpdateParams<Order>;
