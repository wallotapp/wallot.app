import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateStripeSubscriptionParams,
	StripeSubscription,
	getFirestoreCollectionPath,
	stripeSubscriptionsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createStripeSubscription =
	generalizedFirestoreDocumentCreateOperation<
		CreateStripeSubscriptionParams,
		StripeSubscription
	>(
		getFirestoreCollectionPath('stripe_subscription'),
		stripeSubscriptionsApi as unknown as GeneralizedApiResourceSpec,
	);
