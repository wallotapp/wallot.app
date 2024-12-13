import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateTransactionParams,
	Transaction,
	getFirestoreCollectionPath,
	transactionsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createTransaction = generalizedFirestoreDocumentCreateOperation<
	CreateTransactionParams,
	Transaction
>(
	getFirestoreCollectionPath('transaction'),
	transactionsApi as unknown as GeneralizedApiResourceSpec,
);
