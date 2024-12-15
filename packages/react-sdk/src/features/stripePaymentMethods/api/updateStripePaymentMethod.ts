import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateStripePaymentMethodParams,
	getFirestoreCollectionPath,
} from '@wallot/js';

export const updateStripePaymentMethod =
	generalizedFirestoreDocumentUpdateOperation<UpdateStripePaymentMethodParams>(
		getFirestoreCollectionPath('stripe_payment_method'),
	);
