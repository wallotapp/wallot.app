import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateBankAccountParams,
	getFirestoreCollectionPath,
} from '@wallot/js';

export const updateBankAccount =
	generalizedFirestoreDocumentUpdateOperation<UpdateBankAccountParams>(
		getFirestoreCollectionPath('bank_account'),
	);
