import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	UserPersona,
	getFirestoreCollectionPath,
	userPersonasApi,
} from '@wallot/js';

export const queryUserPersonaPage =
	generalizedFirestoreCollectionPageQuery<UserPersona>(
		getFirestoreCollectionPath('user_persona'),
		userPersonasApi as unknown as GeneralizedApiResourceSpec,
	);
