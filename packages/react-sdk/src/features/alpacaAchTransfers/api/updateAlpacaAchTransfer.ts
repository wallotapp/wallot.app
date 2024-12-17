import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data';
import {
	UpdateAlpacaAchTransferParams,
	alpacaAchTransfersApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateAlpacaAchTransfer =
	generalizedFirestoreDocumentUpdateOperation<UpdateAlpacaAchTransferParams>(
		alpacaAchTransfersApi as unknown as GeneralizedApiResourceSpec,
	);
