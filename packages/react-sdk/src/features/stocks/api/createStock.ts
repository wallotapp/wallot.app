import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data';
import { CreateStockParams, Stock, stocksApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createStock = generalizedFirestoreDocumentCreateOperation<
	CreateStockParams,
	Stock
>(stocksApi as unknown as GeneralizedApiResourceSpec);
