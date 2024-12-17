import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data';
import { UpdateAlpacaPositionParams, alpacaPositionsApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateAlpacaPosition =
	generalizedFirestoreDocumentUpdateOperation<UpdateAlpacaPositionParams>(
		alpacaPositionsApi as unknown as GeneralizedApiResourceSpec,
	);
