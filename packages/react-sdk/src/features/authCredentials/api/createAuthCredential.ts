import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateAuthCredentialParams,
	AuthCredential,
	getFirestoreCollectionPath,
	authCredentialsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createAuthCredential = generalizedFirestoreDocumentCreateOperation<
	CreateAuthCredentialParams,
	AuthCredential
>(
	getFirestoreCollectionPath('auth_credential'),
	authCredentialsApi as unknown as GeneralizedApiResourceSpec,
);
