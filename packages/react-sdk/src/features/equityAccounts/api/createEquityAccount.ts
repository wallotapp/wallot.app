import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data';
import {
	CreateEquityAccountParams,
	EquityAccount,
	equityAccountsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createEquityAccount = generalizedFirestoreDocumentCreateOperation<
	CreateEquityAccountParams,
	EquityAccount
>(equityAccountsApi as unknown as GeneralizedApiResourceSpec);
