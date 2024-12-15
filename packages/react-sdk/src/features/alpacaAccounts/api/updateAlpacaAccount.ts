import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateAlpacaAccountParams,
	getFirestoreCollectionPath,
} from '@wallot/js';

export const updateAlpacaAccount =
	generalizedFirestoreDocumentUpdateOperation<UpdateAlpacaAccountParams>(
		getFirestoreCollectionPath('alpaca_account'),
	);
