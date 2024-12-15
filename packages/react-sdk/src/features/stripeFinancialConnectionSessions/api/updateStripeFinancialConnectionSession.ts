import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateStripeFinancialConnectionSessionParams,
	getFirestoreCollectionPath,
} from '@wallot/js';

export const updateStripeFinancialConnectionSession =
	generalizedFirestoreDocumentUpdateOperation<UpdateStripeFinancialConnectionSessionParams>(
		getFirestoreCollectionPath('stripe_financial_connection_session'),
	);
