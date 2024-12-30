import { useMutation } from '@tanstack/react-query';
import { createParameter } from '@wallot/react/src/features/parameters/api/createParameter';
import {
	CreateParameterMutationData,
	CreateParameterMutationError,
	CreateParameterMutationParams,
	UseCreateParameterMutationOptions,
} from '@wallot/react/src/features/parameters/types/ParameterReactTypes';

export function useCreateParameterMutation(
	options?: UseCreateParameterMutationOptions,
) {
	return useMutation<
		CreateParameterMutationData,
		CreateParameterMutationError,
		CreateParameterMutationParams
	>((params: CreateParameterMutationParams) => createParameter(params), {
		onError: (error: CreateParameterMutationError) => {
			console.error('Create operation failed:', error);
		},
		onSuccess: (data: CreateParameterMutationData) => {
			console.log('Create operation successful', data);
		},
		...(options ?? {}),
	});
}
