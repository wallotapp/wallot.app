import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data';
import { UpdateAlpacaOrderParams, alpacaOrdersApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateAlpacaOrder =
	generalizedFirestoreDocumentUpdateOperation<UpdateAlpacaOrderParams>(
		alpacaOrdersApi as unknown as GeneralizedApiResourceSpec,
	);
