import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateTeamParams,
	Team,
	getFirestoreCollectionPath,
	teamsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createTeam = generalizedFirestoreDocumentCreateOperation<
	CreateTeamParams,
	Team
>(
	getFirestoreCollectionPath('team'),
	teamsApi as unknown as GeneralizedApiResourceSpec,
);
