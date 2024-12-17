import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data';
import { UpdateStripeCustomerParams, stripeCustomersApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateStripeCustomer =
	generalizedFirestoreDocumentUpdateOperation<UpdateStripeCustomerParams>(
		stripeCustomersApi as unknown as GeneralizedApiResourceSpec,
	);
