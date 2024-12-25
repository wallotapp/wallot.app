import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data';
import {
	CreateRecommendationParams,
	Recommendation,
	recommendationsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createRecommendation = generalizedFirestoreDocumentCreateOperation<
	CreateRecommendationParams,
	Recommendation
>(recommendationsApi as unknown as GeneralizedApiResourceSpec);
