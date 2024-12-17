import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import { EquityAccount, equityAccountsApi } from '@wallot/js';

export const queryEquityAccountPage =
	generalizedFirestoreCollectionPageQuery<EquityAccount>(
		equityAccountsApi as unknown as GeneralizedApiResourceSpec,
	);
