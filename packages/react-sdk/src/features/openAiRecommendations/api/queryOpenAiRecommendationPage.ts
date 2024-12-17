import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import { OpenAiRecommendation, openAiRecommendationsApi } from '@wallot/js';

export const queryOpenAiRecommendationPage =
	generalizedFirestoreCollectionPageQuery<OpenAiRecommendation>(
		openAiRecommendationsApi as unknown as GeneralizedApiResourceSpec,
	);
