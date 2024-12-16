import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	AlphaVantageStockPrice,
	getFirestoreCollectionPath,
	alphaVantageStockPricesApi,
} from '@wallot/js';

export const queryAlphaVantageStockPricePage =
	generalizedFirestoreCollectionPageQuery<AlphaVantageStockPrice>(
		getFirestoreCollectionPath('alpha_vantage_stock_price'),
		alphaVantageStockPricesApi as unknown as GeneralizedApiResourceSpec,
	);
