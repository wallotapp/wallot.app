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

export const StockPriceCategoryEnum = getEnum(['default']);
export type StockPriceCategory = keyof typeof StockPriceCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
	'alpha_vantage_stock_price',
	'stock',
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'stock_price';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	alpha_vantage_stock_price: apiYupHelpers
		.idRef(['alpha_vantage_stock_price'])
		.min(1)
		.meta({ unique_key: true }),
	category: StockPriceCategoryEnum.getDefinedSchema(),
	stock: apiYupHelpers.idRef(['stock']).min(1),
} as const;
type U = typeof properties;

export const stockPricesApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByCollection[_object],
	properties,
} as const);
export type StockPrice = yup.InferType<
	typeof stockPricesApi.apiResourceJsonSchema
>;
export type CreateStockPriceParams = CreateParams<StockPrice, T>;
export type UpdateStockPriceParams = UpdateParams<StockPrice>;
