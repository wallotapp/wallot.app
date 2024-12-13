import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateSystemIncidentUpdateParams,
	SystemIncidentUpdate,
	getFirestoreCollectionPath,
	systemIncidentUpdatesApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createSystemIncidentUpdate =
	generalizedFirestoreDocumentCreateOperation<
		CreateSystemIncidentUpdateParams,
		SystemIncidentUpdate
	>(
		getFirestoreCollectionPath('system_incident_update'),
		systemIncidentUpdatesApi as unknown as GeneralizedApiResourceSpec,
	);
