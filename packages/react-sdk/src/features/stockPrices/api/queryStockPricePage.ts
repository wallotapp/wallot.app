import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	StockPrice,
	getFirestoreCollectionPath,
	stockPricesApi,
} from '@wallot/js';

export const queryStockPricePage =
	generalizedFirestoreCollectionPageQuery<StockPrice>(
		getFirestoreCollectionPath('stock_price'),
		stockPricesApi as unknown as GeneralizedApiResourceSpec,
	);
