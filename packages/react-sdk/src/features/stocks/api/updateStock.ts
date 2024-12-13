import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import { UpdateStockParams, getFirestoreCollectionPath } from '@wallot/js';

export const updateStock =
	generalizedFirestoreDocumentUpdateOperation<UpdateStockParams>(
		getFirestoreCollectionPath('stock'),
	);
