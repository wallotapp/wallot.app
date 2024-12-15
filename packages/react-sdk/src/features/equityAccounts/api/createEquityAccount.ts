import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateEquityAccountParams,
	EquityAccount,
	getFirestoreCollectionPath,
	equityAccountsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createEquityAccount = generalizedFirestoreDocumentCreateOperation<
	CreateEquityAccountParams,
	EquityAccount
>(
	getFirestoreCollectionPath('equity_account'),
	equityAccountsApi as unknown as GeneralizedApiResourceSpec,
);
