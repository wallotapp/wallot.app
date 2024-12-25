import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data';
import { CreateLicenseParams, License, licensesApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createLicense = generalizedFirestoreDocumentCreateOperation<
	CreateLicenseParams,
	License
>(licensesApi as unknown as GeneralizedApiResourceSpec);
