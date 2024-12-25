import * as yup from 'yup';
import { GeneralizedApiResourceCreateParamsRequiredFieldEnum, GeneralizedApiResourceProperties, CreateParams, UpdateParams, YupHelpers, getApiResourceSpec, getEnum } from 'ergonomic';
import { apiYupHelpers, idPrefixByResourceName } from '../../utils/apiYupHelpers.js';

export const OrderCategoryEnum = getEnum(['default']);
export type OrderCategory = keyof typeof OrderCategoryEnum.obj;

export const OrderStatusEnum = getEnum(['pending', 'confirmed_by_user']);
export type OrderStatus = keyof typeof OrderStatusEnum.obj;

const createParamsRequiredFieldEnum = getEnum([...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr, 'user'] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'order';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	bank_account: apiYupHelpers.idRef(['bank_account']).default(null).nullable().meta({ unique_key: false }),
	category: OrderCategoryEnum.getDefinedSchema(),
	status: OrderStatusEnum.getDefinedSchema().default('pending'),
	user: apiYupHelpers.idRef(['user']).min(1).meta({ unique_key: false }),
} as const;
type U = typeof properties;

export const ordersApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByResourceName[_object],
	properties,
} as const);
export type Order = yup.InferType<typeof ordersApi.apiResourceJsonSchema>;
export type CreateOrderParams = CreateParams<Order, T>;
export type UpdateOrderParams = UpdateParams<Order>;
