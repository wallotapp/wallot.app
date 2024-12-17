import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	StripeFinancialConnectionSession,
	stripeFinancialConnectionSessionsApi,
} from '@wallot/js';

export const queryStripeFinancialConnectionSessionPage =
	generalizedFirestoreCollectionPageQuery<StripeFinancialConnectionSession>(
		stripeFinancialConnectionSessionsApi as unknown as GeneralizedApiResourceSpec,
	);
