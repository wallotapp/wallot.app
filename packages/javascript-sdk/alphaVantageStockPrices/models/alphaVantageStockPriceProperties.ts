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

export const AlphaVantageStockPriceCategoryEnum = getEnum(['daily']);
export type AlphaVantageStockPriceCategory =
	keyof typeof AlphaVantageStockPriceCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'alpha_vantage_stock_price';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	category: AlphaVantageStockPriceCategoryEnum.getDefinedSchema(),
	// Add more properties here
} as const;
type U = typeof properties;

export const alphaVantageStockPricesApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByResourceName[_object],
	properties,
} as const);
export type AlphaVantageStockPrice = yup.InferType<
	typeof alphaVantageStockPricesApi.apiResourceJsonSchema
>;
export type CreateAlphaVantageStockPriceParams = CreateParams<
	AlphaVantageStockPrice,
	T
>;
export type UpdateAlphaVantageStockPriceParams =
	UpdateParams<AlphaVantageStockPrice>;
