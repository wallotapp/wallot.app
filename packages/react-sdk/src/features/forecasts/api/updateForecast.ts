import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import { UpdateForecastParams, getFirestoreCollectionPath } from '@wallot/js';

export const updateForecast =
	generalizedFirestoreDocumentUpdateOperation<UpdateForecastParams>(
		getFirestoreCollectionPath('forecast'),
	);
