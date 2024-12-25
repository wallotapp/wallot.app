import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data';
import { CreateAchTransferParams, AchTransfer, achTransfersApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createAchTransfer = generalizedFirestoreDocumentCreateOperation<CreateAchTransferParams, AchTransfer>(achTransfersApi as unknown as GeneralizedApiResourceSpec);
