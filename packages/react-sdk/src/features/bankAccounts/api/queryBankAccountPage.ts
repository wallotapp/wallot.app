import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import { BankAccount, bankAccountsApi } from '@wallot/js';

export const queryBankAccountPage =
	generalizedFirestoreCollectionPageQuery<BankAccount>(
		bankAccountsApi as unknown as GeneralizedApiResourceSpec,
	);
