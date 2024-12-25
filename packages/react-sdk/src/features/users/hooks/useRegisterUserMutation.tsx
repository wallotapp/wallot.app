import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { GeneralizedError } from 'ergonomic';
import { RegisterUserParams, RegisterUserResponse } from '@wallot/js';
import { registerUser } from '@wallot/react/src/features/users/api/registerUser';

export const useRegisterUserMutation = (options?: UseMutationOptions<RegisterUserResponse, GeneralizedError, RegisterUserParams>) => {
	return useMutation<RegisterUserResponse, GeneralizedError, RegisterUserParams>((params: RegisterUserParams) => registerUser(params), {
		onError: (error: GeneralizedError) => {
			console.error('registerUser operation failed:', error);
		},
		onSuccess: (data: RegisterUserResponse) => {
			console.log('registerUser operation successful', data);
		},
		...(options ?? {}),
	});
};
