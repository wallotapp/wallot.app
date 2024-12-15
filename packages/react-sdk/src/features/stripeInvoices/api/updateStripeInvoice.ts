import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateStripeInvoiceParams,
	getFirestoreCollectionPath,
} from '@wallot/js';

export const updateStripeInvoice =
	generalizedFirestoreDocumentUpdateOperation<UpdateStripeInvoiceParams>(
		getFirestoreCollectionPath('stripe_invoice'),
	);
