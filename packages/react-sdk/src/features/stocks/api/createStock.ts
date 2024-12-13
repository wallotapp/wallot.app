import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateStockParams,
	Stock,
	getFirestoreCollectionPath,
	stocksApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createStock =
	generalizedFirestoreDocumentCreateOperation<
		CreateStockParams,
		Stock
	>(
		getFirestoreCollectionPath('stock'),
		stocksApi as unknown as GeneralizedApiResourceSpec,
	);
