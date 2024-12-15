import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateOpenAiRecommendationParams,
	OpenAiRecommendation,
	getFirestoreCollectionPath,
	openAiRecommendationsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createOpenAiRecommendation =
	generalizedFirestoreDocumentCreateOperation<
		CreateOpenAiRecommendationParams,
		OpenAiRecommendation
	>(
		getFirestoreCollectionPath('open_ai_recommendation'),
		openAiRecommendationsApi as unknown as GeneralizedApiResourceSpec,
	);
