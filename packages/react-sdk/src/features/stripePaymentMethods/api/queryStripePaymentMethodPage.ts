import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	StripePaymentMethod,
	getFirestoreCollectionPath,
	stripePaymentMethodsApi,
} from '@wallot/js';

export const queryStripePaymentMethodPage =
	generalizedFirestoreCollectionPageQuery<StripePaymentMethod>(
		getFirestoreCollectionPath('stripe_payment_method'),
		stripePaymentMethodsApi as unknown as GeneralizedApiResourceSpec,
	);
