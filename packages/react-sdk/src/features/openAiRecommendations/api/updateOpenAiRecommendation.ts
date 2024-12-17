import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data';
import {
	UpdateOpenAiRecommendationParams,
	openAiRecommendationsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateOpenAiRecommendation =
	generalizedFirestoreDocumentUpdateOperation<UpdateOpenAiRecommendationParams>(
		openAiRecommendationsApi as unknown as GeneralizedApiResourceSpec,
	);
