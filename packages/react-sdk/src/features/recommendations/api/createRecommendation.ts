import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateRecommendationParams,
	Recommendation,
	getFirestoreCollectionPath,
	recommendationsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createRecommendation = generalizedFirestoreDocumentCreateOperation<
	CreateRecommendationParams,
	Recommendation
>(
	getFirestoreCollectionPath('recommendation'),
	recommendationsApi as unknown as GeneralizedApiResourceSpec,
);
