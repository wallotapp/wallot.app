import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	StripeInvoice,
	getFirestoreCollectionPath,
	stripeInvoicesApi,
} from '@wallot/js';

export const queryStripeInvoicePage =
	generalizedFirestoreCollectionPageQuery<StripeInvoice>(
		getFirestoreCollectionPath('stripe_invoice'),
		stripeInvoicesApi as unknown as GeneralizedApiResourceSpec,
	);
