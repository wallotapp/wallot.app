import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data';
import {
	UpdateStripeFinancialConnectionSessionParams,
	stripeFinancialConnectionSessionsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateStripeFinancialConnectionSession =
	generalizedFirestoreDocumentUpdateOperation<UpdateStripeFinancialConnectionSessionParams>(
		stripeFinancialConnectionSessionsApi as unknown as GeneralizedApiResourceSpec,
	);
