import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	Stock,
	getFirestoreCollectionPath,
	stocksApi,
} from '@wallot/js';

export const queryStockPage = generalizedFirestoreCollectionPageQuery<Stock>(
	getFirestoreCollectionPath('stock'),
	stocksApi as unknown as GeneralizedApiResourceSpec,
);
