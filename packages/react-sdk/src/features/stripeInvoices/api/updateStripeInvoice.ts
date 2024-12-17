import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data';
import { UpdateStripeInvoiceParams, stripeInvoicesApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateStripeInvoice =
	generalizedFirestoreDocumentUpdateOperation<UpdateStripeInvoiceParams>(
		stripeInvoicesApi as unknown as GeneralizedApiResourceSpec,
	);
