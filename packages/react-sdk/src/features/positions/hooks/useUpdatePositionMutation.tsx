import { useMutation } from '@tanstack/react-query';
import { updatePosition } from '@wallot/react/src/features/positions/api/updatePosition';
import {
	UpdatePositionMutationData,
	UpdatePositionMutationError,
	UpdatePositionMutationParams,
	UseUpdatePositionMutationOptions,
} from '@wallot/react/src/features/positions/types/PositionReactTypes';

export const useUpdatePositionMutation = (
	options?: UseUpdatePositionMutationOptions,
) => {
	return useMutation<
		UpdatePositionMutationData,
		UpdatePositionMutationError,
		UpdatePositionMutationParams
	>((params: UpdatePositionMutationParams) => updatePosition(params), {
		onError: (error: UpdatePositionMutationError) => {
			console.error('Update operation failed:', error);
		},
		onSuccess: (data: UpdatePositionMutationData) => {
			console.log('Update operation successful', data);
		},
		...options,
	});
};
