import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data';
import { UpdateStockParams, stocksApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateStock =
	generalizedFirestoreDocumentUpdateOperation<UpdateStockParams>(
		stocksApi as unknown as GeneralizedApiResourceSpec,
	);
