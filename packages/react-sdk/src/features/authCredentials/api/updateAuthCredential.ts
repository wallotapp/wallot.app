import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data';
import { UpdateAuthCredentialParams, authCredentialsApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateAuthCredential =
	generalizedFirestoreDocumentUpdateOperation<UpdateAuthCredentialParams>(
		authCredentialsApi as unknown as GeneralizedApiResourceSpec,
	);
