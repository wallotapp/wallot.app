import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateStripeFinancialConnectionAccountParams,
	StripeFinancialConnectionAccount,
	getFirestoreCollectionPath,
	stripeFinancialConnectionAccountsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createStripeFinancialConnectionAccount =
	generalizedFirestoreDocumentCreateOperation<
		CreateStripeFinancialConnectionAccountParams,
		StripeFinancialConnectionAccount
	>(
		getFirestoreCollectionPath('stripe_financial_connection_account'),
		stripeFinancialConnectionAccountsApi as unknown as GeneralizedApiResourceSpec,
	);
