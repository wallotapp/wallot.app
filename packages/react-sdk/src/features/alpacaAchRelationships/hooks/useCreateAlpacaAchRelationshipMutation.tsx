import { useMutation } from '@tanstack/react-query';
import { createAlpacaAchRelationship } from '@wallot/react/src/features/alpacaAchRelationships/api/createAlpacaAchRelationship';
import {
	CreateAlpacaAchRelationshipMutationData,
	CreateAlpacaAchRelationshipMutationError,
	CreateAlpacaAchRelationshipMutationParams,
	UseCreateAlpacaAchRelationshipMutationOptions,
} from '@wallot/react/src/features/alpacaAchRelationships/types/AlpacaAchRelationshipReactTypes';

export const useCreateAlpacaAchRelationshipMutation = (
	options?: UseCreateAlpacaAchRelationshipMutationOptions,
) => {
	return useMutation<
		CreateAlpacaAchRelationshipMutationData,
		CreateAlpacaAchRelationshipMutationError,
		CreateAlpacaAchRelationshipMutationParams
	>(
		(params: CreateAlpacaAchRelationshipMutationParams) =>
			createAlpacaAchRelationship(params),
		{
			onError: (error: CreateAlpacaAchRelationshipMutationError) => {
				console.error('Create operation failed:', error);
			},
			onSuccess: (data: CreateAlpacaAchRelationshipMutationData) => {
				console.log('Create operation successful', data);
			},
			...(options ?? {}),
		},
	);
};
