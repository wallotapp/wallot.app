import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateAchTransferParams,
	getFirestoreCollectionPath,
} from '@wallot/js';

export const updateAchTransfer =
	generalizedFirestoreDocumentUpdateOperation<UpdateAchTransferParams>(
		getFirestoreCollectionPath('ach_transfer'),
	);
