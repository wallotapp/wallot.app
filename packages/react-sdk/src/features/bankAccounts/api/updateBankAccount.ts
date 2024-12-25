import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data';
import { UpdateBankAccountParams, bankAccountsApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateBankAccount =
	generalizedFirestoreDocumentUpdateOperation<UpdateBankAccountParams>(
		bankAccountsApi as unknown as GeneralizedApiResourceSpec,
	);
