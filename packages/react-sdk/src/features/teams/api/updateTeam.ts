import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateTeamParams,
	Team,
	getFirestoreCollectionPath,
	teamsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateTeam =
	generalizedFirestoreDocumentUpdateOperation<
		UpdateTeamParams,
		Team
	>(
		getFirestoreCollectionPath('team'),
		teamsApi as unknown as GeneralizedApiResourceSpec,
	);
