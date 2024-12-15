import { useMutation } from '@tanstack/react-query';
import { createUserPersona } from '@wallot/react/src/features/userPersonas/api/createUserPersona';
import {
	CreateUserPersonaMutationData,
	CreateUserPersonaMutationError,
	CreateUserPersonaMutationParams,
	UseCreateUserPersonaMutationOptions,
} from '@wallot/react/src/features/userPersonas/types/UserPersonaReactTypes';

export const useCreateUserPersonaMutation = (
	options?: UseCreateUserPersonaMutationOptions,
) => {
	return useMutation<
		CreateUserPersonaMutationData,
		CreateUserPersonaMutationError,
		CreateUserPersonaMutationParams
	>((params: CreateUserPersonaMutationParams) => createUserPersona(params), {
		onError: (error: CreateUserPersonaMutationError) => {
			console.error('Create operation failed:', error);
		},
		onSuccess: (data: CreateUserPersonaMutationData) => {
			console.log('Create operation successful', data);
		},
		...options,
	});
};
