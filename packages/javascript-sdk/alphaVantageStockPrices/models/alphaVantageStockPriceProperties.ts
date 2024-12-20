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
	'adjusted_close',
	'close',
	'dividend_amount',
	'high',
	'low',
	'open',
	'split_coefficient',
	'symbol',
	'timestamp',
	'time_zone',
	'volume',
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'alpha_vantage_stock_price';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	adjusted_close: yup.string().nullable().default(null),
	category: AlphaVantageStockPriceCategoryEnum.getDefinedSchema(),
	close: yup.string().nullable().default(null),
	dividend_amount: yup.string().nullable().default(null),
	high: yup.string().nullable().default(null),
	low: yup.string().nullable().default(null),
	open: yup.string().nullable().default(null),
	split_coefficient: yup.string().nullable().default(null),
	symbol: yup
		.string()
		.defined()
		.meta({
			unique_by: ['timestamp'],
			unique_key: false,
		}),
	timestamp: YupHelpers.date(),
	time_zone: yup.string().nullable().default(null),
	volume: yup.string().nullable().default(null),
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
