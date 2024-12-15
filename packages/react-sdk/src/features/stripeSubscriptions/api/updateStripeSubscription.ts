import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateStripeSubscriptionParams,
	getFirestoreCollectionPath,
} from '@wallot/js';

export const updateStripeSubscription =
	generalizedFirestoreDocumentUpdateOperation<UpdateStripeSubscriptionParams>(
		getFirestoreCollectionPath('stripe_subscription'),
	);
