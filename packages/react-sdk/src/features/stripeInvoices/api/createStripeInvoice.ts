import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateStripeInvoiceParams,
	StripeInvoice,
	getFirestoreCollectionPath,
	stripeInvoicesApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createStripeInvoice = generalizedFirestoreDocumentCreateOperation<
	CreateStripeInvoiceParams,
	StripeInvoice
>(
	getFirestoreCollectionPath('stripe_invoice'),
	stripeInvoicesApi as unknown as GeneralizedApiResourceSpec,
);
