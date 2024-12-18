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

export const ForecastCategoryEnum = getEnum(['default']);
export type ForecastCategory = keyof typeof ForecastCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
	'asset_prices',
	'model',
	'news_reports',
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'forecast';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	asset_prices: apiYupHelpers.idRefs(['asset_price']).min(1),
	category: ForecastCategoryEnum.getDefinedSchema(),
	model: apiYupHelpers.idRef(['model']).min(1).meta({ unique_key: false }),
	news_reports: apiYupHelpers.idRefs(['news_report']).min(1),
} as const;
type U = typeof properties;

export const forecastsApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByResourceName[_object],
	properties,
} as const);
export type Forecast = yup.InferType<typeof forecastsApi.apiResourceJsonSchema>;
export type CreateForecastParams = CreateParams<Forecast, T>;
export type UpdateForecastParams = UpdateParams<Forecast>;
