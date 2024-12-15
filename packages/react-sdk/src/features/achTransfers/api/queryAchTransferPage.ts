import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	AchTransfer,
	getFirestoreCollectionPath,
	achTransfersApi,
} from '@wallot/js';

export const queryAchTransferPage =
	generalizedFirestoreCollectionPageQuery<AchTransfer>(
		getFirestoreCollectionPath('ach_transfer'),
		achTransfersApi as unknown as GeneralizedApiResourceSpec,
	);
