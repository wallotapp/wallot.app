import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateFundingAccountParams,
	getFirestoreCollectionPath,
} from '@wallot/js';

export const updateFundingAccount =
	generalizedFirestoreDocumentUpdateOperation<UpdateFundingAccountParams>(
		getFirestoreCollectionPath('funding_account'),
	);
