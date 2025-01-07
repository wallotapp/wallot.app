import { useMutation } from '@tanstack/react-query';
import { createModelFamily } from '@wallot/react/src/features/modelFamilies/api/createModelFamily';
import {
	CreateModelFamilyMutationData,
	CreateModelFamilyMutationError,
	CreateModelFamilyMutationParams,
	UseCreateModelFamilyMutationOptions,
} from '@wallot/react/src/features/modelFamilies/types/ModelFamilyReactTypes';

export function useCreateModelFamilyMutation(
	options?: UseCreateModelFamilyMutationOptions,
) {
	return useMutation<
		CreateModelFamilyMutationData,
		CreateModelFamilyMutationError,
		CreateModelFamilyMutationParams
	>((params: CreateModelFamilyMutationParams) => createModelFamily(params), {
		onError: (error: CreateModelFamilyMutationError) => {
			console.error('Create operation failed:', error);
		},
		onSuccess: (data: CreateModelFamilyMutationData) => {
			console.log('Create operation successful', data);
		},
		...(options ?? {}),
	});
}
