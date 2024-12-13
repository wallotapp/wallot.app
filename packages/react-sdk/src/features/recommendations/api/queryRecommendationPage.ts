import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	Recommendation,
	getFirestoreCollectionPath,
	recommendationsApi,
} from '@wallot/js';

export const queryRecommendationPage = generalizedFirestoreCollectionPageQuery<Recommendation>(
	getFirestoreCollectionPath('recommendation'),
	recommendationsApi as unknown as GeneralizedApiResourceSpec,
);
