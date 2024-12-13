import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateSystemIncidentUpdateParams,
	getFirestoreCollectionPath,
} from '@wallot/js';

export const updateSystemIncidentUpdate =
	generalizedFirestoreDocumentUpdateOperation<UpdateSystemIncidentUpdateParams>(
		getFirestoreCollectionPath('system_incident_update'),
	);
