import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	SystemIncidentUpdate,
	getFirestoreCollectionPath,
	systemIncidentUpdatesApi,
} from '@wallot/js';

export const querySystemIncidentUpdatePage = generalizedFirestoreCollectionPageQuery<SystemIncidentUpdate>(
	getFirestoreCollectionPath('system_incident_update'),
	systemIncidentUpdatesApi as unknown as GeneralizedApiResourceSpec,
);
