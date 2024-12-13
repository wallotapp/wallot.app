import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateSystemIncidentParams,
	SystemIncident,
	getFirestoreCollectionPath,
	systemIncidentsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateSystemIncident = generalizedFirestoreDocumentUpdateOperation<
	UpdateSystemIncidentParams,
	SystemIncident
>(
	getFirestoreCollectionPath('system_incident'),
	systemIncidentsApi as unknown as GeneralizedApiResourceSpec,
);
