import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateOpenAiModelFamilyParams,
	getFirestoreCollectionPath,
} from '@wallot/js';

export const updateOpenAiModelFamily =
	generalizedFirestoreDocumentUpdateOperation<UpdateOpenAiModelFamilyParams>(
		getFirestoreCollectionPath('open_ai_model_family'),
	);
