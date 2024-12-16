import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import { UpdateParameterParams, getFirestoreCollectionPath } from '@wallot/js';

export const updateParameter =
	generalizedFirestoreDocumentUpdateOperation<UpdateParameterParams>(
		getFirestoreCollectionPath('parameter'),
	);
