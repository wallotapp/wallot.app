import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateLicenseParams,
	License,
	getFirestoreCollectionPath,
	licensesApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createLicense =
	generalizedFirestoreDocumentCreateOperation<
		CreateLicenseParams,
		License
	>(
		getFirestoreCollectionPath('license'),
		licensesApi as unknown as GeneralizedApiResourceSpec,
	);
