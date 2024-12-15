import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateStripeCustomerParams,
	getFirestoreCollectionPath,
} from '@wallot/js';

export const updateStripeCustomer =
	generalizedFirestoreDocumentUpdateOperation<UpdateStripeCustomerParams>(
		getFirestoreCollectionPath('stripe_customer'),
	);
