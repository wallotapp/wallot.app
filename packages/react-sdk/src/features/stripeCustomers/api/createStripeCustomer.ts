import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateStripeCustomerParams,
	StripeCustomer,
	getFirestoreCollectionPath,
	stripeCustomersApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createStripeCustomer = generalizedFirestoreDocumentCreateOperation<
	CreateStripeCustomerParams,
	StripeCustomer
>(
	getFirestoreCollectionPath('stripe_customer'),
	stripeCustomersApi as unknown as GeneralizedApiResourceSpec,
);
