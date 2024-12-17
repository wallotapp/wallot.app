import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import { AlpacaAccount, alpacaAccountsApi } from '@wallot/js';

export const queryAlpacaAccountPage =
	generalizedFirestoreCollectionPageQuery<AlpacaAccount>(
		alpacaAccountsApi as unknown as GeneralizedApiResourceSpec,
	);
