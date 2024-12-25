import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data';
import { UpdateRecommendationParams, recommendationsApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateRecommendation = generalizedFirestoreDocumentUpdateOperation<UpdateRecommendationParams>(recommendationsApi as unknown as GeneralizedApiResourceSpec);
