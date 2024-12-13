import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	Forecast,
	getFirestoreCollectionPath,
	forecastsApi,
} from '@wallot/js';

export const queryForecastPage = generalizedFirestoreCollectionPageQuery<Forecast>(
	getFirestoreCollectionPath('forecast'),
	forecastsApi as unknown as GeneralizedApiResourceSpec,
);
