import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	StripeTransaction,
	getFirestoreCollectionPath,
	stripeTransactionsApi,
} from '@wallot/js';

export const queryStripeTransactionPage =
	generalizedFirestoreCollectionPageQuery<StripeTransaction>(
		getFirestoreCollectionPath('stripe_transaction'),
		stripeTransactionsApi as unknown as GeneralizedApiResourceSpec,
	);
