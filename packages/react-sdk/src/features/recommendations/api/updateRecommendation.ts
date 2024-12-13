import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateRecommendationParams,
	getFirestoreCollectionPath,
} from '@wallot/js';

export const updateRecommendation =
	generalizedFirestoreDocumentUpdateOperation<UpdateRecommendationParams>(
		getFirestoreCollectionPath('recommendation'),
	);
