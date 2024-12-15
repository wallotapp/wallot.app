import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateStripeTransactionParams,
	getFirestoreCollectionPath,
} from '@wallot/js';

export const updateStripeTransaction =
	generalizedFirestoreDocumentUpdateOperation<UpdateStripeTransactionParams>(
		getFirestoreCollectionPath('stripe_transaction'),
	);
