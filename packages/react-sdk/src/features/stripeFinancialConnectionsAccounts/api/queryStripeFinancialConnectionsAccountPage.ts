import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	StripeFinancialConnectionsAccount,
	getFirestoreCollectionPath,
	stripeFinancialConnectionsAccountsApi,
} from '@wallot/js';

export const queryStripeFinancialConnectionsAccountPage =
	generalizedFirestoreCollectionPageQuery<StripeFinancialConnectionsAccount>(
		getFirestoreCollectionPath('stripe_financial_connections_account'),
		stripeFinancialConnectionsAccountsApi as unknown as GeneralizedApiResourceSpec,
	);
