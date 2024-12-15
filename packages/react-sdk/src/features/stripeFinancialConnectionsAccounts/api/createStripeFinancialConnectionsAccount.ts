import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateStripeFinancialConnectionsAccountParams,
	StripeFinancialConnectionsAccount,
	getFirestoreCollectionPath,
	stripeFinancialConnectionsAccountsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createStripeFinancialConnectionsAccount =
	generalizedFirestoreDocumentCreateOperation<
		CreateStripeFinancialConnectionsAccountParams,
		StripeFinancialConnectionsAccount
	>(
		getFirestoreCollectionPath('stripe_financial_connections_account'),
		stripeFinancialConnectionsAccountsApi as unknown as GeneralizedApiResourceSpec,
	);
