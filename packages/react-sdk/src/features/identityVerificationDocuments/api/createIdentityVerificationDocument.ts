import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data';
import { CreateIdentityVerificationDocumentParams, IdentityVerificationDocument, identityVerificationDocumentsApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createIdentityVerificationDocument = generalizedFirestoreDocumentCreateOperation<CreateIdentityVerificationDocumentParams, IdentityVerificationDocument>(identityVerificationDocumentsApi as unknown as GeneralizedApiResourceSpec);
