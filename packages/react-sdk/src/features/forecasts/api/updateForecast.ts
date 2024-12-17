import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data';
import { UpdateForecastParams, forecastsApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateForecast =
	generalizedFirestoreDocumentUpdateOperation<UpdateForecastParams>(
		forecastsApi as unknown as GeneralizedApiResourceSpec,
	);
