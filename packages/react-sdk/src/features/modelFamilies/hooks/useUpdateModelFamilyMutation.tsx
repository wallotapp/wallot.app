import { useMutation } from '@tanstack/react-query';
import { updateModelFamily } from '@wallot/react/src/features/modelFamilies/api/updateModelFamily';
import { UpdateModelFamilyMutationData, UpdateModelFamilyMutationError, UpdateModelFamilyMutationParams, UseUpdateModelFamilyMutationOptions } from '@wallot/react/src/features/modelFamilies/types/ModelFamilyReactTypes';

export const useUpdateModelFamilyMutation = (options?: UseUpdateModelFamilyMutationOptions) => {
	return useMutation<UpdateModelFamilyMutationData, UpdateModelFamilyMutationError, UpdateModelFamilyMutationParams>((params: UpdateModelFamilyMutationParams) => updateModelFamily(params), {
		onError: (error: UpdateModelFamilyMutationError) => {
			console.error('Update operation failed:', error);
		},
		onSuccess: (data: UpdateModelFamilyMutationData) => {
			console.log('Update operation successful', data);
		},
		...(options ?? {}),
	});
};
