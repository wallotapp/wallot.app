import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import { UpdateModelParams, getFirestoreCollectionPath } from '@wallot/js';

export const updateModel =
	generalizedFirestoreDocumentUpdateOperation<UpdateModelParams>(
		getFirestoreCollectionPath('model'),
	);
