import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import { UpdateStockPriceParams, getFirestoreCollectionPath } from '@wallot/js';

export const updateStockPrice =
	generalizedFirestoreDocumentUpdateOperation<UpdateStockPriceParams>(
		getFirestoreCollectionPath('stock_price'),
	);
