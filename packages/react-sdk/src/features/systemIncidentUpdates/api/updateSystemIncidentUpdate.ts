import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateSystemIncidentUpdateParams,
	SystemIncidentUpdate,
	getFirestoreCollectionPath,
	systemIncidentUpdatesApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateSystemIncidentUpdate =
	generalizedFirestoreDocumentUpdateOperation<
		UpdateSystemIncidentUpdateParams,
		SystemIncidentUpdate
	>(
		getFirestoreCollectionPath('system_incident_update'),
		systemIncidentUpdatesApi as unknown as GeneralizedApiResourceSpec,
	);
