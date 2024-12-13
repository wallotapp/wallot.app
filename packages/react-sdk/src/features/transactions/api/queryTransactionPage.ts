import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	Transaction,
	getFirestoreCollectionPath,
	transactionsApi,
} from '@wallot/js';

export const queryTransactionPage =
	generalizedFirestoreCollectionPageQuery<Transaction>(
		getFirestoreCollectionPath('transaction'),
		transactionsApi as unknown as GeneralizedApiResourceSpec,
	);
