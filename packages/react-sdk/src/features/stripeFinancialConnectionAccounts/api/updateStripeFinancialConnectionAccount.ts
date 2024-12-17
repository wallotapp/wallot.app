import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data';
import {
	UpdateStripeFinancialConnectionAccountParams,
	stripeFinancialConnectionAccountsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateStripeFinancialConnectionAccount =
	generalizedFirestoreDocumentUpdateOperation<UpdateStripeFinancialConnectionAccountParams>(
		stripeFinancialConnectionAccountsApi as unknown as GeneralizedApiResourceSpec,
	);
