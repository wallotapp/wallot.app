import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateTransactionParams,
	Transaction,
	getFirestoreCollectionPath,
	transactionsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateTransaction = generalizedFirestoreDocumentUpdateOperation<
	UpdateTransactionParams,
	Transaction
>(
	getFirestoreCollectionPath('transaction'),
	transactionsApi as unknown as GeneralizedApiResourceSpec,
);
