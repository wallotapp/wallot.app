import { useMutation } from '@tanstack/react-query';
import { createPosition } from '@wallot/react/src/features/positions/api/createPosition';
import {
	CreatePositionMutationData,
	CreatePositionMutationError,
	CreatePositionMutationParams,
	UseCreatePositionMutationOptions,
} from '@wallot/react/src/features/positions/types/PositionReactTypes';

export const useCreatePositionMutation = (
	options?: UseCreatePositionMutationOptions,
) => {
	return useMutation<
		CreatePositionMutationData,
		CreatePositionMutationError,
		CreatePositionMutationParams
	>((params: CreatePositionMutationParams) => createPosition(params), {
		onError: (error: CreatePositionMutationError) => {
			console.error('Create operation failed:', error);
		},
		onSuccess: (data: CreatePositionMutationData) => {
			console.log('Create operation successful', data);
		},
		...options,
	});
};
