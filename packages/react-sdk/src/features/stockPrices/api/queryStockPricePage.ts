import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import { StockPrice, stockPricesApi } from '@wallot/js';

export const queryStockPricePage =
	generalizedFirestoreCollectionPageQuery<StockPrice>(
		stockPricesApi as unknown as GeneralizedApiResourceSpec,
	);
