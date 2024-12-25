import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data';
import {
	CreateBankAccountParams,
	BankAccount,
	bankAccountsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createBankAccount = generalizedFirestoreDocumentCreateOperation<
	CreateBankAccountParams,
	BankAccount
>(bankAccountsApi as unknown as GeneralizedApiResourceSpec);
