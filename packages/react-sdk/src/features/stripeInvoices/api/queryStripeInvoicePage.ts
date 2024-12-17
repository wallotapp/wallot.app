import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import { StripeInvoice, stripeInvoicesApi } from '@wallot/js';

export const queryStripeInvoicePage =
	generalizedFirestoreCollectionPageQuery<StripeInvoice>(
		stripeInvoicesApi as unknown as GeneralizedApiResourceSpec,
	);
