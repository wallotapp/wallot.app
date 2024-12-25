import { useMutation } from '@tanstack/react-query';
import { updateParameter } from '@wallot/react/src/features/parameters/api/updateParameter';
import {
	UpdateParameterMutationData,
	UpdateParameterMutationError,
	UpdateParameterMutationParams,
	UseUpdateParameterMutationOptions,
} from '@wallot/react/src/features/parameters/types/ParameterReactTypes';

export const useUpdateParameterMutation = (
	options?: UseUpdateParameterMutationOptions,
) => {
	return useMutation<
		UpdateParameterMutationData,
		UpdateParameterMutationError,
		UpdateParameterMutationParams
	>((params: UpdateParameterMutationParams) => updateParameter(params), {
		onError: (error: UpdateParameterMutationError) => {
			console.error('Update operation failed:', error);
		},
		onSuccess: (data: UpdateParameterMutationData) => {
			console.log('Update operation successful', data);
		},
		...(options ?? {}),
	});
};
