import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	StripeCustomer,
	getFirestoreCollectionPath,
	stripeCustomersApi,
} from '@wallot/js';

export const queryStripeCustomerPage =
	generalizedFirestoreCollectionPageQuery<StripeCustomer>(
		getFirestoreCollectionPath('stripe_customer'),
		stripeCustomersApi as unknown as GeneralizedApiResourceSpec,
	);
