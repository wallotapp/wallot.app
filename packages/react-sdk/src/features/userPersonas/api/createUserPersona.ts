import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateUserPersonaParams,
	UserPersona,
	getFirestoreCollectionPath,
	userPersonasApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createUserPersona = generalizedFirestoreDocumentCreateOperation<
	CreateUserPersonaParams,
	UserPersona
>(
	getFirestoreCollectionPath('user_persona'),
	userPersonasApi as unknown as GeneralizedApiResourceSpec,
);
