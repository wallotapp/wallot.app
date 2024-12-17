import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data';
import { UpdateAlpacaAccountParams, alpacaAccountsApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateAlpacaAccount =
	generalizedFirestoreDocumentUpdateOperation<UpdateAlpacaAccountParams>(
		alpacaAccountsApi as unknown as GeneralizedApiResourceSpec,
	);
