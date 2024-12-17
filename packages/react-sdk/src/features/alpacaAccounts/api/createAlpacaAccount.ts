import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data';
import {
	CreateAlpacaAccountParams,
	AlpacaAccount,
	alpacaAccountsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createAlpacaAccount = generalizedFirestoreDocumentCreateOperation<
	CreateAlpacaAccountParams,
	AlpacaAccount
>(alpacaAccountsApi as unknown as GeneralizedApiResourceSpec);
