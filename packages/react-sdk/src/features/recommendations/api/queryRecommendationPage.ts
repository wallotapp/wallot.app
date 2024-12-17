import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import { Recommendation, recommendationsApi } from '@wallot/js';

export const queryRecommendationPage =
	generalizedFirestoreCollectionPageQuery<Recommendation>(
		recommendationsApi as unknown as GeneralizedApiResourceSpec,
	);
