import { useMutation } from '@tanstack/react-query';
import { createUser } from '@wallot/react/src/features/users/api/createUser';
import { CreateUserMutationData, CreateUserMutationError, CreateUserMutationParams, UseCreateUserMutationOptions } from '@wallot/react/src/features/users/types/UserReactTypes';

export const useCreateUserMutation = (options?: UseCreateUserMutationOptions) => {
	return useMutation<CreateUserMutationData, CreateUserMutationError, CreateUserMutationParams>((params: CreateUserMutationParams) => createUser(params), {
		onError: (error: CreateUserMutationError) => {
			console.error('Create operation failed:', error);
		},
		onSuccess: (data: CreateUserMutationData) => {
			console.log('Create operation successful', data);
		},
		...(options ?? {}),
	});
};
