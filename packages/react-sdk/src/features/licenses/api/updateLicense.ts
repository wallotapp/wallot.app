import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data';
import { UpdateLicenseParams, licensesApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateLicense = generalizedFirestoreDocumentUpdateOperation<UpdateLicenseParams>(licensesApi as unknown as GeneralizedApiResourceSpec);
