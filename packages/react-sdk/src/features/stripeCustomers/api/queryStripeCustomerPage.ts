import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import { StripeCustomer, stripeCustomersApi } from '@wallot/js';

export const queryStripeCustomerPage =
	generalizedFirestoreCollectionPageQuery<StripeCustomer>(
		stripeCustomersApi as unknown as GeneralizedApiResourceSpec,
	);
