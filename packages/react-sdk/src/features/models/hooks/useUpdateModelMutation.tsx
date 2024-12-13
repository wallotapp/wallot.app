import { useMutation } from '@tanstack/react-query';
import { updateModel } from '@wallot/react/src/features/models/api/updateModel';
import {
	UpdateModelMutationData,
	UpdateModelMutationError,
	UpdateModelMutationParams,
	UseUpdateModelMutationOptions,
} from '@wallot/react/src/features/models/types/ModelReactTypes';

export const useUpdateModelMutation = (
	options?: UseUpdateModelMutationOptions,
) => {
	return useMutation<
		UpdateModelMutationData,
		UpdateModelMutationError,
		UpdateModelMutationParams
	>(
		(params: UpdateModelMutationParams) =>
			updateModel(params),
		{
			onError: (error: UpdateModelMutationError) => {
				console.error('Update operation failed:', error);
			},
			onSuccess: (data: UpdateModelMutationData) => {
				console.log('Update operation successful', data);
			},
			...options,
		},
	);
};
