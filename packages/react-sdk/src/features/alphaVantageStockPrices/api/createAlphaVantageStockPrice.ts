import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateAlphaVantageStockPriceParams,
	AlphaVantageStockPrice,
	getFirestoreCollectionPath,
	alphaVantageStockPricesApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createAlphaVantageStockPrice =
	generalizedFirestoreDocumentCreateOperation<
		CreateAlphaVantageStockPriceParams,
		AlphaVantageStockPrice
	>(
		getFirestoreCollectionPath('alpha_vantage_stock_price'),
		alphaVantageStockPricesApi as unknown as GeneralizedApiResourceSpec,
	);
