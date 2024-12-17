import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data';
import {
	CreateStripeInvoiceParams,
	StripeInvoice,
	stripeInvoicesApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createStripeInvoice = generalizedFirestoreDocumentCreateOperation<
	CreateStripeInvoiceParams,
	StripeInvoice
>(stripeInvoicesApi as unknown as GeneralizedApiResourceSpec);
