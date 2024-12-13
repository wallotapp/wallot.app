import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateSystemIncidentParams,
	getFirestoreCollectionPath,
} from '@wallot/js';

export const updateSystemIncident =
	generalizedFirestoreDocumentUpdateOperation<UpdateSystemIncidentParams>(
		getFirestoreCollectionPath('system_incident'),
	);
