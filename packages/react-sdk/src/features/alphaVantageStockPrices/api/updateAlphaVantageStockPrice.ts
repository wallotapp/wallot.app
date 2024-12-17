import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data';
import {
	UpdateAlphaVantageStockPriceParams,
	alphaVantageStockPricesApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateAlphaVantageStockPrice =
	generalizedFirestoreDocumentUpdateOperation<UpdateAlphaVantageStockPriceParams>(
		alphaVantageStockPricesApi as unknown as GeneralizedApiResourceSpec,
	);
