import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import { UpdatePositionParams, getFirestoreCollectionPath } from '@wallot/js';

export const updatePosition =
	generalizedFirestoreDocumentUpdateOperation<UpdatePositionParams>(
		getFirestoreCollectionPath('position'),
	);
