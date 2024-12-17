import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import { AlphaVantageStockPrice, alphaVantageStockPricesApi } from '@wallot/js';

export const queryAlphaVantageStockPricePage =
	generalizedFirestoreCollectionPageQuery<AlphaVantageStockPrice>(
		alphaVantageStockPricesApi as unknown as GeneralizedApiResourceSpec,
	);
