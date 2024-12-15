import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	BankAccount,
	getFirestoreCollectionPath,
	bankAccountsApi,
} from '@wallot/js';

export const queryBankAccountPage =
	generalizedFirestoreCollectionPageQuery<BankAccount>(
		getFirestoreCollectionPath('bank_account'),
		bankAccountsApi as unknown as GeneralizedApiResourceSpec,
	);
