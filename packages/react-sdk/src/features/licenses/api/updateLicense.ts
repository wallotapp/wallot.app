import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateLicenseParams,
	License,
	getFirestoreCollectionPath,
	licensesApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateLicense = generalizedFirestoreDocumentUpdateOperation<
	UpdateLicenseParams,
	License
>(
	getFirestoreCollectionPath('license'),
	licensesApi as unknown as GeneralizedApiResourceSpec,
);
