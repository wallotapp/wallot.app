import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data';
import {
	CreateOpenAiRecommendationParams,
	OpenAiRecommendation,
	openAiRecommendationsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createOpenAiRecommendation =
	generalizedFirestoreDocumentCreateOperation<
		CreateOpenAiRecommendationParams,
		OpenAiRecommendation
	>(openAiRecommendationsApi as unknown as GeneralizedApiResourceSpec);
