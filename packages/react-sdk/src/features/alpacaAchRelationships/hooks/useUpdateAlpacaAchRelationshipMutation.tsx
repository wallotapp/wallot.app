import { useMutation } from '@tanstack/react-query';
import { updateAlpacaAchRelationship } from '@wallot/react/src/features/alpacaAchRelationships/api/updateAlpacaAchRelationship';
import {
	UpdateAlpacaAchRelationshipMutationData,
	UpdateAlpacaAchRelationshipMutationError,
	UpdateAlpacaAchRelationshipMutationParams,
	UseUpdateAlpacaAchRelationshipMutationOptions,
} from '@wallot/react/src/features/alpacaAchRelationships/types/AlpacaAchRelationshipReactTypes';

export const useUpdateAlpacaAchRelationshipMutation = (
	options?: UseUpdateAlpacaAchRelationshipMutationOptions,
) => {
	return useMutation<
		UpdateAlpacaAchRelationshipMutationData,
		UpdateAlpacaAchRelationshipMutationError,
		UpdateAlpacaAchRelationshipMutationParams
	>(
		(params: UpdateAlpacaAchRelationshipMutationParams) =>
			updateAlpacaAchRelationship(params),
		{
			onError: (error: UpdateAlpacaAchRelationshipMutationError) => {
				console.error('Update operation failed:', error);
			},
			onSuccess: (data: UpdateAlpacaAchRelationshipMutationData) => {
				console.log('Update operation successful', data);
			},
			...(options ?? {}),
		},
	);
};
