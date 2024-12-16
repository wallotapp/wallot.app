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

export const StockOrderCategoryEnum = getEnum(['default']);
export type StockOrderCategory = keyof typeof StockOrderCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
	'order',
	'stock',
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'stock_order';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	alpaca_order: apiYupHelpers
		.idRef(['alpaca_order'])
		.default(null)
		.nullable()
		.meta({ unique_key: true }),
	category: StockOrderCategoryEnum.getDefinedSchema(),
	order: apiYupHelpers.idRef(['order']).min(1),
	position: apiYupHelpers.idRef(['position']).default(null).nullable(),
	recommendations: apiYupHelpers
		.idRefs(['recommendation'])
		.default(null)
		.nullable(),
	stock: apiYupHelpers.idRef(['stock']).min(1),
} as const;
type U = typeof properties;

export const stockOrdersApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByCollection[_object],
	properties,
} as const);
export type StockOrder = yup.InferType<
	typeof stockOrdersApi.apiResourceJsonSchema
>;
export type CreateStockOrderParams = CreateParams<StockOrder, T>;
export type UpdateStockOrderParams = UpdateParams<StockOrder>;
