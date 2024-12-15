import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateOpenAiRecommendationParams,
	getFirestoreCollectionPath,
} from '@wallot/js';

export const updateOpenAiRecommendation =
	generalizedFirestoreDocumentUpdateOperation<UpdateOpenAiRecommendationParams>(
		getFirestoreCollectionPath('open_ai_recommendation'),
	);
