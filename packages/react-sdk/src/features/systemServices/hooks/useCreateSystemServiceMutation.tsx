import { useMutation } from '@tanstack/react-query';
import { createSystemService } from '@wallot/react/src/features/systemServices/api/createSystemService';
import {
	CreateSystemServiceMutationData,
	CreateSystemServiceMutationError,
	CreateSystemServiceMutationParams,
	UseCreateSystemServiceMutationOptions,
} from '@wallot/react/src/features/systemServices/types/SystemServiceReactTypes';

export const useCreateSystemServiceMutation = (
	options?: UseCreateSystemServiceMutationOptions,
) => {
	return useMutation<
		CreateSystemServiceMutationData,
		CreateSystemServiceMutationError,
		CreateSystemServiceMutationParams
	>(
		(params: CreateSystemServiceMutationParams) => createSystemService(params),
		{
			onError: (error: CreateSystemServiceMutationError) => {
				console.error('Create operation failed:', error);
			},
			onSuccess: (data: CreateSystemServiceMutationData) => {
				console.log('Create operation successful', data);
			},
			...options,
		},
	);
};
