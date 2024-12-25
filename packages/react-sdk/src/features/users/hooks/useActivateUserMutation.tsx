import { useContext } from 'react';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { GeneralizedError } from 'ergonomic';
import { AuthContext } from 'ergonomic-react/src/features/authentication/providers/AuthProvider';
import { ActivateUserParams, ActivateUserResponse } from '@wallot/js';
import { activateUser } from '@wallot/react/src/features/users/api/activateUser';

export const useActivateUserMutation = (
	options?: UseMutationOptions<
		ActivateUserResponse,
		GeneralizedError,
		ActivateUserParams
	>,
) => {
	const { user: firebaseUser } = useContext(AuthContext);
	return useMutation<
		ActivateUserResponse,
		GeneralizedError,
		ActivateUserParams
	>((params: ActivateUserParams) => activateUser(firebaseUser, params), {
		onError: (error: GeneralizedError) => {
			console.error('activateUser operation failed:', error);
		},
		onSuccess: (data: ActivateUserResponse) => {
			console.log('activateUser operation successful', data);
		},
		...(options ?? {}),
	});
};
