import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateStripeFinancialConnectionSessionParams,
	StripeFinancialConnectionSession,
	getFirestoreCollectionPath,
	stripeFinancialConnectionSessionsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createStripeFinancialConnectionSession =
	generalizedFirestoreDocumentCreateOperation<
		CreateStripeFinancialConnectionSessionParams,
		StripeFinancialConnectionSession
	>(
		getFirestoreCollectionPath('stripe_financial_connection_session'),
		stripeFinancialConnectionSessionsApi as unknown as GeneralizedApiResourceSpec,
	);
