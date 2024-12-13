import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateInvoiceParams,
	Invoice,
	getFirestoreCollectionPath,
	invoicesApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createInvoice = generalizedFirestoreDocumentCreateOperation<
	CreateInvoiceParams,
	Invoice
>(
	getFirestoreCollectionPath('invoice'),
	invoicesApi as unknown as GeneralizedApiResourceSpec,
);
