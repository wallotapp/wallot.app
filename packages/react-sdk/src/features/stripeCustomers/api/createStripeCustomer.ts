import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data';
import {
	CreateStripeCustomerParams,
	StripeCustomer,
	stripeCustomersApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createStripeCustomer = generalizedFirestoreDocumentCreateOperation<
	CreateStripeCustomerParams,
	StripeCustomer
>(stripeCustomersApi as unknown as GeneralizedApiResourceSpec);
