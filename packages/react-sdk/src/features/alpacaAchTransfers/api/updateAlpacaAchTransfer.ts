import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateAlpacaAchTransferParams,
	getFirestoreCollectionPath,
} from '@wallot/js';

export const updateAlpacaAchTransfer =
	generalizedFirestoreDocumentUpdateOperation<UpdateAlpacaAchTransferParams>(
		getFirestoreCollectionPath('alpaca_ach_transfer'),
	);
