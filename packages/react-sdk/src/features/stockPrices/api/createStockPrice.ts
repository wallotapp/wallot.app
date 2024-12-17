import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data';
import { CreateStockPriceParams, StockPrice, stockPricesApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createStockPrice = generalizedFirestoreDocumentCreateOperation<
	CreateStockPriceParams,
	StockPrice
>(stockPricesApi as unknown as GeneralizedApiResourceSpec);
