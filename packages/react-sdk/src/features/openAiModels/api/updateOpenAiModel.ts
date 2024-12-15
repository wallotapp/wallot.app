import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateOpenAiModelParams,
	getFirestoreCollectionPath,
} from '@wallot/js';

export const updateOpenAiModel =
	generalizedFirestoreDocumentUpdateOperation<UpdateOpenAiModelParams>(
		getFirestoreCollectionPath('open_ai_model'),
	);
