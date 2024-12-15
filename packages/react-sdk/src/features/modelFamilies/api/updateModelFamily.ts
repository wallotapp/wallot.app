import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateModelFamilyParams,
	getFirestoreCollectionPath,
} from '@wallot/js';

export const updateModelFamily =
	generalizedFirestoreDocumentUpdateOperation<UpdateModelFamilyParams>(
		getFirestoreCollectionPath('model_family'),
	);
