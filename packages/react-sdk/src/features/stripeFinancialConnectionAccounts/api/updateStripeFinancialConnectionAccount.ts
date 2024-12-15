import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateStripeFinancialConnectionAccountParams,
	getFirestoreCollectionPath,
} from '@wallot/js';

export const updateStripeFinancialConnectionAccount =
	generalizedFirestoreDocumentUpdateOperation<UpdateStripeFinancialConnectionAccountParams>(
		getFirestoreCollectionPath('stripe_financial_connection_account'),
	);
