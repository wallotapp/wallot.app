import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateAchTransferParams,
	AchTransfer,
	getFirestoreCollectionPath,
	achTransfersApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createAchTransfer = generalizedFirestoreDocumentCreateOperation<
	CreateAchTransferParams,
	AchTransfer
>(
	getFirestoreCollectionPath('ach_transfer'),
	achTransfersApi as unknown as GeneralizedApiResourceSpec,
);
