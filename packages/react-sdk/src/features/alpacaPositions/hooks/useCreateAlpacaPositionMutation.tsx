import { useMutation } from '@tanstack/react-query';
import { createAlpacaPosition } from '@wallot/react/src/features/alpacaPositions/api/createAlpacaPosition';
import {
	CreateAlpacaPositionMutationData,
	CreateAlpacaPositionMutationError,
	CreateAlpacaPositionMutationParams,
	UseCreateAlpacaPositionMutationOptions,
} from '@wallot/react/src/features/alpacaPositions/types/AlpacaPositionReactTypes';

export const useCreateAlpacaPositionMutation = (
	options?: UseCreateAlpacaPositionMutationOptions,
) => {
	return useMutation<
		CreateAlpacaPositionMutationData,
		CreateAlpacaPositionMutationError,
		CreateAlpacaPositionMutationParams
	>(
		(params: CreateAlpacaPositionMutationParams) =>
			createAlpacaPosition(params),
		{
			onError: (error: CreateAlpacaPositionMutationError) => {
				console.error('Create operation failed:', error);
			},
			onSuccess: (data: CreateAlpacaPositionMutationData) => {
				console.log('Create operation successful', data);
			},
			...options,
		},
	);
};
