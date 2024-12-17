import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data';
import {
	CreateAuthCredentialParams,
	AuthCredential,
	authCredentialsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createAuthCredential = generalizedFirestoreDocumentCreateOperation<
	CreateAuthCredentialParams,
	AuthCredential
>(authCredentialsApi as unknown as GeneralizedApiResourceSpec);
