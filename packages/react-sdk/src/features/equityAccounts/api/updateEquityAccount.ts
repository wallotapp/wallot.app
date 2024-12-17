import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data';
import { UpdateEquityAccountParams, equityAccountsApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateEquityAccount =
	generalizedFirestoreDocumentUpdateOperation<UpdateEquityAccountParams>(
		equityAccountsApi as unknown as GeneralizedApiResourceSpec,
	);
