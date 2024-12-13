import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import { UpdateLicenseParams, getFirestoreCollectionPath } from '@wallot/js';

export const updateLicense =
	generalizedFirestoreDocumentUpdateOperation<UpdateLicenseParams>(
		getFirestoreCollectionPath('license'),
	);
