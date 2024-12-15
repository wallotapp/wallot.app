import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateStripeTransactionParams,
	StripeTransaction,
	getFirestoreCollectionPath,
	stripeTransactionsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createStripeTransaction =
	generalizedFirestoreDocumentCreateOperation<
		CreateStripeTransactionParams,
		StripeTransaction
	>(
		getFirestoreCollectionPath('stripe_transaction'),
		stripeTransactionsApi as unknown as GeneralizedApiResourceSpec,
	);
