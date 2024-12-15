import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	EquityAccount,
	getFirestoreCollectionPath,
	equityAccountsApi,
} from '@wallot/js';

export const queryEquityAccountPage =
	generalizedFirestoreCollectionPageQuery<EquityAccount>(
		getFirestoreCollectionPath('equity_account'),
		equityAccountsApi as unknown as GeneralizedApiResourceSpec,
	);
