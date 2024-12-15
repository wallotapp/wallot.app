import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	AlpacaAccount,
	getFirestoreCollectionPath,
	alpacaAccountsApi,
} from '@wallot/js';

export const queryAlpacaAccountPage =
	generalizedFirestoreCollectionPageQuery<AlpacaAccount>(
		getFirestoreCollectionPath('alpaca_account'),
		alpacaAccountsApi as unknown as GeneralizedApiResourceSpec,
	);
