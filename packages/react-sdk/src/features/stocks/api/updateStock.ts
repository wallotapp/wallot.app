import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateStockParams,
	Stock,
	getFirestoreCollectionPath,
	stocksApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateStock =
	generalizedFirestoreDocumentUpdateOperation<
		UpdateStockParams,
		Stock
	>(
		getFirestoreCollectionPath('stock'),
		stocksApi as unknown as GeneralizedApiResourceSpec,
	);
