import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateStockPriceParams,
	StockPrice,
	getFirestoreCollectionPath,
	stockPricesApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createStockPrice = generalizedFirestoreDocumentCreateOperation<
	CreateStockPriceParams,
	StockPrice
>(
	getFirestoreCollectionPath('stock_price'),
	stockPricesApi as unknown as GeneralizedApiResourceSpec,
);
