import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data';
import { CreateStockOrderParams, StockOrder, stockOrdersApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createStockOrder = generalizedFirestoreDocumentCreateOperation<
	CreateStockOrderParams,
	StockOrder
>(stockOrdersApi as unknown as GeneralizedApiResourceSpec);
