import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data';
import {
	UpdateStripeSubscriptionParams,
	stripeSubscriptionsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateStripeSubscription =
	generalizedFirestoreDocumentUpdateOperation<UpdateStripeSubscriptionParams>(
		stripeSubscriptionsApi as unknown as GeneralizedApiResourceSpec,
	);
