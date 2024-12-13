import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import { Team, getFirestoreCollectionPath, teamsApi } from '@wallot/js';

export const queryTeamPage = generalizedFirestoreCollectionPageQuery<Team>(
	getFirestoreCollectionPath('team'),
	teamsApi as unknown as GeneralizedApiResourceSpec,
);
