import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateAlphaVantageStockPriceParams,
	getFirestoreCollectionPath,
} from '@wallot/js';

export const updateAlphaVantageStockPrice =
	generalizedFirestoreDocumentUpdateOperation<UpdateAlphaVantageStockPriceParams>(
		getFirestoreCollectionPath('alpha_vantage_stock_price'),
	);
