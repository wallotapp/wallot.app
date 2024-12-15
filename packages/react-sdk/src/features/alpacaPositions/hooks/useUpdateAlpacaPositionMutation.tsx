import { useMutation } from '@tanstack/react-query';
import { updateAlpacaPosition } from '@wallot/react/src/features/alpacaPositions/api/updateAlpacaPosition';
import {
	UpdateAlpacaPositionMutationData,
	UpdateAlpacaPositionMutationError,
	UpdateAlpacaPositionMutationParams,
	UseUpdateAlpacaPositionMutationOptions,
} from '@wallot/react/src/features/alpacaPositions/types/AlpacaPositionReactTypes';

export const useUpdateAlpacaPositionMutation = (
	options?: UseUpdateAlpacaPositionMutationOptions,
) => {
	return useMutation<
		UpdateAlpacaPositionMutationData,
		UpdateAlpacaPositionMutationError,
		UpdateAlpacaPositionMutationParams
	>(
		(params: UpdateAlpacaPositionMutationParams) =>
			updateAlpacaPosition(params),
		{
			onError: (error: UpdateAlpacaPositionMutationError) => {
				console.error('Update operation failed:', error);
			},
			onSuccess: (data: UpdateAlpacaPositionMutationData) => {
				console.log('Update operation successful', data);
			},
			...options,
		},
	);
};
