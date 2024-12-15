import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateUserPersonaParams,
	getFirestoreCollectionPath,
} from '@wallot/js';

export const updateUserPersona =
	generalizedFirestoreDocumentUpdateOperation<UpdateUserPersonaParams>(
		getFirestoreCollectionPath('user_persona'),
	);
