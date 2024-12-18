import { useMutation } from '@tanstack/react-query';
import { createOpenAiRecommendation } from '@wallot/react/src/features/openAiRecommendations/api/createOpenAiRecommendation';
import {
	CreateOpenAiRecommendationMutationData,
	CreateOpenAiRecommendationMutationError,
	CreateOpenAiRecommendationMutationParams,
	UseCreateOpenAiRecommendationMutationOptions,
} from '@wallot/react/src/features/openAiRecommendations/types/OpenAiRecommendationReactTypes';

export const useCreateOpenAiRecommendationMutation = (
	options?: UseCreateOpenAiRecommendationMutationOptions,
) => {
	return useMutation<
		CreateOpenAiRecommendationMutationData,
		CreateOpenAiRecommendationMutationError,
		CreateOpenAiRecommendationMutationParams
	>(
		(params: CreateOpenAiRecommendationMutationParams) =>
			createOpenAiRecommendation(params),
		{
			onError: (error: CreateOpenAiRecommendationMutationError) => {
				console.error('Create operation failed:', error);
			},
			onSuccess: (data: CreateOpenAiRecommendationMutationData) => {
				console.log('Create operation successful', data);
			},
			...(options ?? {}),
		},
	);
};
