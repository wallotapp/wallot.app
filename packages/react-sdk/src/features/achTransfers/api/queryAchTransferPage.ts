import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import { AchTransfer, achTransfersApi } from '@wallot/js';

export const queryAchTransferPage = generalizedFirestoreCollectionPageQuery<AchTransfer>(achTransfersApi as unknown as GeneralizedApiResourceSpec);
