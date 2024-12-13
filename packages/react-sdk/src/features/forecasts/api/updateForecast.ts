import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateForecastParams,
	Forecast,
	getFirestoreCollectionPath,
	forecastsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateForecast =
	generalizedFirestoreDocumentUpdateOperation<
		UpdateForecastParams,
		Forecast
	>(
		getFirestoreCollectionPath('forecast'),
		forecastsApi as unknown as GeneralizedApiResourceSpec,
	);
