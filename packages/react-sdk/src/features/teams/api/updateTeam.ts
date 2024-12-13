import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import { UpdateTeamParams, getFirestoreCollectionPath } from '@wallot/js';

export const updateTeam =
	generalizedFirestoreDocumentUpdateOperation<UpdateTeamParams>(
		getFirestoreCollectionPath('team'),
	);
