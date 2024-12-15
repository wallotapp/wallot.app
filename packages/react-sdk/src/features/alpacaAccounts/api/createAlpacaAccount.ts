import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateAlpacaAccountParams,
	AlpacaAccount,
	getFirestoreCollectionPath,
	alpacaAccountsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createAlpacaAccount = generalizedFirestoreDocumentCreateOperation<
	CreateAlpacaAccountParams,
	AlpacaAccount
>(
	getFirestoreCollectionPath('alpaca_account'),
	alpacaAccountsApi as unknown as GeneralizedApiResourceSpec,
);
