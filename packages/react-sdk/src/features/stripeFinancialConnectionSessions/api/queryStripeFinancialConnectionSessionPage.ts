import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	StripeFinancialConnectionSession,
	getFirestoreCollectionPath,
	stripeFinancialConnectionSessionsApi,
} from '@wallot/js';

export const queryStripeFinancialConnectionSessionPage =
	generalizedFirestoreCollectionPageQuery<StripeFinancialConnectionSession>(
		getFirestoreCollectionPath('stripe_financial_connection_session'),
		stripeFinancialConnectionSessionsApi as unknown as GeneralizedApiResourceSpec,
	);
