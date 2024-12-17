import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	StripeFinancialConnectionAccount,
	stripeFinancialConnectionAccountsApi,
} from '@wallot/js';

export const queryStripeFinancialConnectionAccountPage =
	generalizedFirestoreCollectionPageQuery<StripeFinancialConnectionAccount>(
		stripeFinancialConnectionAccountsApi as unknown as GeneralizedApiResourceSpec,
	);
