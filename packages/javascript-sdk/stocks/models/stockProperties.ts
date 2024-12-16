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

export const StockCategoryEnum = getEnum(['default']);
export type StockCategory = keyof typeof StockCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
	'alpaca_asset',
	'alpha_vantage_company',
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'stock';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	alpaca_asset: apiYupHelpers.idRef(['alpaca_asset']).min(1),
	alpha_vantage_company: apiYupHelpers.idRef(['alpha_vantage_company']).min(1),
	category: StockCategoryEnum.getDefinedSchema(),
} as const;
type U = typeof properties;

export const stocksApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByCollection[_object],
	properties,
} as const);
export type Stock = yup.InferType<typeof stocksApi.apiResourceJsonSchema>;
export type CreateStockParams = CreateParams<Stock, T>;
export type UpdateStockParams = UpdateParams<Stock>;
