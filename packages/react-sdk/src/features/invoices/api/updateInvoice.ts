import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import { UpdateInvoiceParams, getFirestoreCollectionPath } from '@wallot/js';

export const updateInvoice =
	generalizedFirestoreDocumentUpdateOperation<UpdateInvoiceParams>(
		getFirestoreCollectionPath('invoice'),
	);
