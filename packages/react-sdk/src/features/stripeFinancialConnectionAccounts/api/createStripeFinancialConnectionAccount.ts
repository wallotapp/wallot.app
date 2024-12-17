import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data';
import {
	CreateStripeFinancialConnectionAccountParams,
	StripeFinancialConnectionAccount,
	stripeFinancialConnectionAccountsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createStripeFinancialConnectionAccount =
	generalizedFirestoreDocumentCreateOperation<
		CreateStripeFinancialConnectionAccountParams,
		StripeFinancialConnectionAccount
	>(
		stripeFinancialConnectionAccountsApi as unknown as GeneralizedApiResourceSpec,
	);
