import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data';
import {
	CreateStripeSubscriptionParams,
	StripeSubscription,
	stripeSubscriptionsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createStripeSubscription =
	generalizedFirestoreDocumentCreateOperation<
		CreateStripeSubscriptionParams,
		StripeSubscription
	>(stripeSubscriptionsApi as unknown as GeneralizedApiResourceSpec);
