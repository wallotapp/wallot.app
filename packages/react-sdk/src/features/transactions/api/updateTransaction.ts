import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateTransactionParams,
	getFirestoreCollectionPath,
} from '@wallot/js';

export const updateTransaction =
	generalizedFirestoreDocumentUpdateOperation<UpdateTransactionParams>(
		getFirestoreCollectionPath('transaction'),
	);
