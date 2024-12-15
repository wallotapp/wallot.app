import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateStockOrderParams,
	StockOrder,
	getFirestoreCollectionPath,
	stockOrdersApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createStockOrder = generalizedFirestoreDocumentCreateOperation<
	CreateStockOrderParams,
	StockOrder
>(
	getFirestoreCollectionPath('stock_order'),
	stockOrdersApi as unknown as GeneralizedApiResourceSpec,
);
