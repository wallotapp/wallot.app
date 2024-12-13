import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateForecastParams,
	Forecast,
	getFirestoreCollectionPath,
	forecastsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createForecast =
	generalizedFirestoreDocumentCreateOperation<
		CreateForecastParams,
		Forecast
	>(
		getFirestoreCollectionPath('forecast'),
		forecastsApi as unknown as GeneralizedApiResourceSpec,
	);
