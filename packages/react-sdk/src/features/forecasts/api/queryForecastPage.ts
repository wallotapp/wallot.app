import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import { Forecast, forecastsApi } from '@wallot/js';

export const queryForecastPage =
	generalizedFirestoreCollectionPageQuery<Forecast>(
		forecastsApi as unknown as GeneralizedApiResourceSpec,
	);
