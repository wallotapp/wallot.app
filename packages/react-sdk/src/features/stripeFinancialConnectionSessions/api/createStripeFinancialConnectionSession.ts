import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data';
import {
	CreateStripeFinancialConnectionSessionParams,
	StripeFinancialConnectionSession,
	stripeFinancialConnectionSessionsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createStripeFinancialConnectionSession =
	generalizedFirestoreDocumentCreateOperation<
		CreateStripeFinancialConnectionSessionParams,
		StripeFinancialConnectionSession
	>(
		stripeFinancialConnectionSessionsApi as unknown as GeneralizedApiResourceSpec,
	);
