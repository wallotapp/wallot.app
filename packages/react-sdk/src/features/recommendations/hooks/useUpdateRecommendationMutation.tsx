import { useMutation } from '@tanstack/react-query';
import { updateRecommendation } from '@wallot/react/src/features/recommendations/api/updateRecommendation';
import {
	UpdateRecommendationMutationData,
	UpdateRecommendationMutationError,
	UpdateRecommendationMutationParams,
	UseUpdateRecommendationMutationOptions,
} from '@wallot/react/src/features/recommendations/types/RecommendationReactTypes';

export function useUpdateRecommendationMutation(
	options?: UseUpdateRecommendationMutationOptions,
) {
	return useMutation<
		UpdateRecommendationMutationData,
		UpdateRecommendationMutationError,
		UpdateRecommendationMutationParams
	>(
		(params: UpdateRecommendationMutationParams) =>
			updateRecommendation(params),
		{
			onError: (error: UpdateRecommendationMutationError) => {
				console.error('Update operation failed:', error);
			},
			onSuccess: (data: UpdateRecommendationMutationData) => {
				console.log('Update operation successful', data);
			},
			...(options ?? {}),
		},
	);
}
