import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import { UpdateStockOrderParams, getFirestoreCollectionPath } from '@wallot/js';

export const updateStockOrder =
	generalizedFirestoreDocumentUpdateOperation<UpdateStockOrderParams>(
		getFirestoreCollectionPath('stock_order'),
	);
