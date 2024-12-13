import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import { UpdateOrderParams, getFirestoreCollectionPath } from '@wallot/js';

export const updateOrder =
	generalizedFirestoreDocumentUpdateOperation<UpdateOrderParams>(
		getFirestoreCollectionPath('order'),
	);
