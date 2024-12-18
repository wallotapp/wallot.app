import { useMutation } from '@tanstack/react-query';
import { updateOpenAiRecommendation } from '@wallot/react/src/features/openAiRecommendations/api/updateOpenAiRecommendation';
import {
	UpdateOpenAiRecommendationMutationData,
	UpdateOpenAiRecommendationMutationError,
	UpdateOpenAiRecommendationMutationParams,
	UseUpdateOpenAiRecommendationMutationOptions,
} from '@wallot/react/src/features/openAiRecommendations/types/OpenAiRecommendationReactTypes';

export const useUpdateOpenAiRecommendationMutation = (
	options?: UseUpdateOpenAiRecommendationMutationOptions,
) => {
	return useMutation<
		UpdateOpenAiRecommendationMutationData,
		UpdateOpenAiRecommendationMutationError,
		UpdateOpenAiRecommendationMutationParams
	>(
		(params: UpdateOpenAiRecommendationMutationParams) =>
			updateOpenAiRecommendation(params),
		{
			onError: (error: UpdateOpenAiRecommendationMutationError) => {
				console.error('Update operation failed:', error);
			},
			onSuccess: (data: UpdateOpenAiRecommendationMutationData) => {
				console.log('Update operation successful', data);
			},
			...(options ?? {}),
		},
	);
};
