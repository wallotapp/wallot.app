import { useMutation } from '@tanstack/react-query';
import { createRecommendation } from '@wallot/react/src/features/recommendations/api/createRecommendation';
import {
	CreateRecommendationMutationData,
	CreateRecommendationMutationError,
	CreateRecommendationMutationParams,
	UseCreateRecommendationMutationOptions,
} from '@wallot/react/src/features/recommendations/types/RecommendationReactTypes';

export const useCreateRecommendationMutation = (
	options?: UseCreateRecommendationMutationOptions,
) => {
	return useMutation<
		CreateRecommendationMutationData,
		CreateRecommendationMutationError,
		CreateRecommendationMutationParams
	>(
		(params: CreateRecommendationMutationParams) =>
			createRecommendation(params),
		{
			onError: (error: CreateRecommendationMutationError) => {
				console.error('Create operation failed:', error);
			},
			onSuccess: (data: CreateRecommendationMutationData) => {
				console.log('Create operation successful', data);
			},
			...(options ?? {}),
		},
	);
};
