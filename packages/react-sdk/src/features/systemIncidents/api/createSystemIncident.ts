import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateSystemIncidentParams,
	SystemIncident,
	getFirestoreCollectionPath,
	systemIncidentsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createSystemIncident =
	generalizedFirestoreDocumentCreateOperation<
		CreateSystemIncidentParams,
		SystemIncident
	>(
		getFirestoreCollectionPath('system_incident'),
		systemIncidentsApi as unknown as GeneralizedApiResourceSpec,
	);
