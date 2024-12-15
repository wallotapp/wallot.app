import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	StripeFinancialConnectionAccount,
	getFirestoreCollectionPath,
	stripeFinancialConnectionAccountsApi,
} from '@wallot/js';

export const queryStripeFinancialConnectionAccountPage =
	generalizedFirestoreCollectionPageQuery<StripeFinancialConnectionAccount>(
		getFirestoreCollectionPath('stripe_financial_connection_account'),
		stripeFinancialConnectionAccountsApi as unknown as GeneralizedApiResourceSpec,
	);
