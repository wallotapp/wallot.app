import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateInvoiceParams,
	Invoice,
	getFirestoreCollectionPath,
	invoicesApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateInvoice = generalizedFirestoreDocumentUpdateOperation<
	UpdateInvoiceParams,
	Invoice
>(
	getFirestoreCollectionPath('invoice'),
	invoicesApi as unknown as GeneralizedApiResourceSpec,
);
