import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	OpenAiRecommendation,
	getFirestoreCollectionPath,
	openAiRecommendationsApi,
} from '@wallot/js';

export const queryOpenAiRecommendationPage =
	generalizedFirestoreCollectionPageQuery<OpenAiRecommendation>(
		getFirestoreCollectionPath('open_ai_recommendation'),
		openAiRecommendationsApi as unknown as GeneralizedApiResourceSpec,
	);
