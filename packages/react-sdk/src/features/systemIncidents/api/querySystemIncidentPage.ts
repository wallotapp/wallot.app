import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	SystemIncident,
	getFirestoreCollectionPath,
	systemIncidentsApi,
} from '@wallot/js';

export const querySystemIncidentPage = generalizedFirestoreCollectionPageQuery<SystemIncident>(
	getFirestoreCollectionPath('system_incident'),
	systemIncidentsApi as unknown as GeneralizedApiResourceSpec,
);
