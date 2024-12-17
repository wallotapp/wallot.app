import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import { StripeSubscription, stripeSubscriptionsApi } from '@wallot/js';

export const queryStripeSubscriptionPage =
	generalizedFirestoreCollectionPageQuery<StripeSubscription>(
		stripeSubscriptionsApi as unknown as GeneralizedApiResourceSpec,
	);
