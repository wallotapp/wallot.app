import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateAuthCredentialParams,
	getFirestoreCollectionPath,
} from '@wallot/js';

export const updateAuthCredential =
	generalizedFirestoreDocumentUpdateOperation<UpdateAuthCredentialParams>(
		getFirestoreCollectionPath('auth_credential'),
	);
