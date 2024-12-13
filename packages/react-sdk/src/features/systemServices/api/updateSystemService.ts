import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateSystemServiceParams,
	getFirestoreCollectionPath,
} from '@wallot/js';

export const updateSystemService =
	generalizedFirestoreDocumentUpdateOperation<UpdateSystemServiceParams>(
		getFirestoreCollectionPath('system_service'),
	);
