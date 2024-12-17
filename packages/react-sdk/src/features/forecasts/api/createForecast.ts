import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data';
import { CreateForecastParams, Forecast, forecastsApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createForecast = generalizedFirestoreDocumentCreateOperation<
	CreateForecastParams,
	Forecast
>(forecastsApi as unknown as GeneralizedApiResourceSpec);
