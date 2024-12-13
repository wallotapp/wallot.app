import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	AuthCredential,
	getFirestoreCollectionPath,
	authCredentialsApi,
} from '@wallot/js';

export const queryAuthCredentialPage = generalizedFirestoreCollectionPageQuery<AuthCredential>(
	getFirestoreCollectionPath('auth_credential'),
	authCredentialsApi as unknown as GeneralizedApiResourceSpec,
);
