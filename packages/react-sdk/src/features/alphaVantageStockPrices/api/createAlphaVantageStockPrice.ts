import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data';
import {
	CreateAlphaVantageStockPriceParams,
	AlphaVantageStockPrice,
	alphaVantageStockPricesApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createAlphaVantageStockPrice =
	generalizedFirestoreDocumentCreateOperation<
		CreateAlphaVantageStockPriceParams,
		AlphaVantageStockPrice
	>(alphaVantageStockPricesApi as unknown as GeneralizedApiResourceSpec);
