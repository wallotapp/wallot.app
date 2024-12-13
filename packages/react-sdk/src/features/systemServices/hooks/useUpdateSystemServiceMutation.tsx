import { useMutation } from '@tanstack/react-query';
import { updateSystemService } from '@wallot/react/src/features/systemServices/api/updateSystemService';
import {
	UpdateSystemServiceMutationData,
	UpdateSystemServiceMutationError,
	UpdateSystemServiceMutationParams,
	UseUpdateSystemServiceMutationOptions,
} from '@wallot/react/src/features/systemServices/types/SystemServiceReactTypes';

export const useUpdateSystemServiceMutation = (
	options?: UseUpdateSystemServiceMutationOptions,
) => {
	return useMutation<
		UpdateSystemServiceMutationData,
		UpdateSystemServiceMutationError,
		UpdateSystemServiceMutationParams
	>(
		(params: UpdateSystemServiceMutationParams) =>
			updateSystemService(params),
		{
			onError: (error: UpdateSystemServiceMutationError) => {
				console.error('Update operation failed:', error);
			},
			onSuccess: (data: UpdateSystemServiceMutationData) => {
				console.log('Update operation successful', data);
			},
			...options,
		},
	);
};
