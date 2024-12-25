import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import { IdentityVerificationDocument, identityVerificationDocumentsApi } from '@wallot/js';

export const queryIdentityVerificationDocumentPage = generalizedFirestoreCollectionPageQuery<IdentityVerificationDocument>(identityVerificationDocumentsApi as unknown as GeneralizedApiResourceSpec);
