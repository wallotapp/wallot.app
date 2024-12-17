import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import { StockOrder, stockOrdersApi } from '@wallot/js';

export const queryStockOrderPage =
	generalizedFirestoreCollectionPageQuery<StockOrder>(
		stockOrdersApi as unknown as GeneralizedApiResourceSpec,
	);
