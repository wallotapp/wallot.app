import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateBankAccountParams,
	BankAccount,
	getFirestoreCollectionPath,
	bankAccountsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createBankAccount = generalizedFirestoreDocumentCreateOperation<
	CreateBankAccountParams,
	BankAccount
>(
	getFirestoreCollectionPath('bank_account'),
	bankAccountsApi as unknown as GeneralizedApiResourceSpec,
);
