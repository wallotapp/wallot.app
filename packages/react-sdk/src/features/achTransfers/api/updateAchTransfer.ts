import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data';
import { UpdateAchTransferParams, achTransfersApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateAchTransfer =
	generalizedFirestoreDocumentUpdateOperation<UpdateAchTransferParams>(
		achTransfersApi as unknown as GeneralizedApiResourceSpec,
	);
