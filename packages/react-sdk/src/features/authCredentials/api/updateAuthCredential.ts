import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateAuthCredentialParams,
	AuthCredential,
	getFirestoreCollectionPath,
	authCredentialsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateAuthCredential = generalizedFirestoreDocumentUpdateOperation<
	UpdateAuthCredentialParams,
	AuthCredential
>(
	getFirestoreCollectionPath('auth_credential'),
	authCredentialsApi as unknown as GeneralizedApiResourceSpec,
);
