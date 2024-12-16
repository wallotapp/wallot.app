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

export const ForecastCategoryEnum = getEnum(['default']);
export type ForecastCategory = keyof typeof ForecastCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
	'model',
	'news_reports',
	'stock_prices',
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'forecast';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	category: ForecastCategoryEnum.getDefinedSchema(),
	model: apiYupHelpers.idRef(['model']).min(1).meta({ unique_key: false }),
	news_reports: apiYupHelpers.idRefs(['news_report']).min(1),
	stock_prices: apiYupHelpers.idRefs(['stock_price']).min(1),
} as const;
type U = typeof properties;

export const forecastsApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByCollection[_object],
	properties,
} as const);
export type Forecast = yup.InferType<typeof forecastsApi.apiResourceJsonSchema>;
export type CreateForecastParams = CreateParams<Forecast, T>;
export type UpdateForecastParams = UpdateParams<Forecast>;
