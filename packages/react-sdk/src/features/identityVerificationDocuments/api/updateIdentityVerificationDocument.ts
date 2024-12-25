import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data';
import {
	UpdateIdentityVerificationDocumentParams,
	identityVerificationDocumentsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateIdentityVerificationDocument =
	generalizedFirestoreDocumentUpdateOperation<UpdateIdentityVerificationDocumentParams>(
		identityVerificationDocumentsApi as unknown as GeneralizedApiResourceSpec,
	);
