import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import { UpdateUserParams, getFirestoreCollectionPath } from '@wallot/js';

export const updateUser =
	generalizedFirestoreDocumentUpdateOperation<UpdateUserParams>(
		getFirestoreCollectionPath('user'),
	);
