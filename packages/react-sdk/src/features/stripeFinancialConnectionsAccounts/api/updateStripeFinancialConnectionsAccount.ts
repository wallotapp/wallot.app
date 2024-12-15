import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateStripeFinancialConnectionsAccountParams,
	getFirestoreCollectionPath,
} from '@wallot/js';

export const updateStripeFinancialConnectionsAccount =
	generalizedFirestoreDocumentUpdateOperation<UpdateStripeFinancialConnectionsAccountParams>(
		getFirestoreCollectionPath('stripe_financial_connections_account'),
	);
