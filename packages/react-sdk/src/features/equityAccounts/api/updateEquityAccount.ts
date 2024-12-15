import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateEquityAccountParams,
	getFirestoreCollectionPath,
} from '@wallot/js';

export const updateEquityAccount =
	generalizedFirestoreDocumentUpdateOperation<UpdateEquityAccountParams>(
		getFirestoreCollectionPath('equity_account'),
	);
