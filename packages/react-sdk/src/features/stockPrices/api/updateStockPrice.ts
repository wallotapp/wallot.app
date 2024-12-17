import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data';
import { UpdateStockPriceParams, stockPricesApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateStockPrice =
	generalizedFirestoreDocumentUpdateOperation<UpdateStockPriceParams>(
		stockPricesApi as unknown as GeneralizedApiResourceSpec,
	);
