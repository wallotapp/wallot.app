import { useMutation } from '@tanstack/react-query';
import { createModel } from '@wallot/react/src/features/models/api/createModel';
import {
	CreateModelMutationData,
	CreateModelMutationError,
	CreateModelMutationParams,
	UseCreateModelMutationOptions,
} from '@wallot/react/src/features/models/types/ModelReactTypes';

export function useCreateModelMutation(
	options?: UseCreateModelMutationOptions,
) {
	return useMutation<
		CreateModelMutationData,
		CreateModelMutationError,
		CreateModelMutationParams
	>((params: CreateModelMutationParams) => createModel(params), {
		onError: (error: CreateModelMutationError) => {
			console.error('Create operation failed:', error);
		},
		onSuccess: (data: CreateModelMutationData) => {
			console.log('Create operation successful', data);
		},
		...(options ?? {}),
	});
}
