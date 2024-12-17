import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data';
import { UpdateStockOrderParams, stockOrdersApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateStockOrder =
	generalizedFirestoreDocumentUpdateOperation<UpdateStockOrderParams>(
		stockOrdersApi as unknown as GeneralizedApiResourceSpec,
	);
