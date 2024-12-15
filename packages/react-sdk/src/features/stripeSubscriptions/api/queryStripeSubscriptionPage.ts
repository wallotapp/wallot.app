import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	StripeSubscription,
	getFirestoreCollectionPath,
	stripeSubscriptionsApi,
} from '@wallot/js';

export const queryStripeSubscriptionPage =
	generalizedFirestoreCollectionPageQuery<StripeSubscription>(
		getFirestoreCollectionPath('stripe_subscription'),
		stripeSubscriptionsApi as unknown as GeneralizedApiResourceSpec,
	);
