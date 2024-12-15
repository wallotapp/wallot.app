import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	StockOrder,
	getFirestoreCollectionPath,
	stockOrdersApi,
} from '@wallot/js';

export const queryStockOrderPage =
	generalizedFirestoreCollectionPageQuery<StockOrder>(
		getFirestoreCollectionPath('stock_order'),
		stockOrdersApi as unknown as GeneralizedApiResourceSpec,
	);
