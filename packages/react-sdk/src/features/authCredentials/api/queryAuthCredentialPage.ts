import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import { AuthCredential, authCredentialsApi } from '@wallot/js';

export const queryAuthCredentialPage =
	generalizedFirestoreCollectionPageQuery<AuthCredential>(
		authCredentialsApi as unknown as GeneralizedApiResourceSpec,
	);
