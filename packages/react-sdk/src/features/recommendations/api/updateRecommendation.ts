import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateRecommendationParams,
	Recommendation,
	getFirestoreCollectionPath,
	recommendationsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateRecommendation =
	generalizedFirestoreDocumentUpdateOperation<
		UpdateRecommendationParams,
		Recommendation
	>(
		getFirestoreCollectionPath('recommendation'),
		recommendationsApi as unknown as GeneralizedApiResourceSpec,
	);
