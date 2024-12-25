import { useContext } from 'react';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { GeneralizedError } from 'ergonomic';
import { AuthContext } from 'ergonomic-react/src/features/authentication/providers/AuthProvider';
import { FirebaseUserCustomTokenResponse } from 'ergonomic';
import { createFirebaseAuthCustomToken } from '@wallot/react/src/features/users/api/createFirebaseAuthCustomToken';

export const useCreateFirebaseAuthCustomTokenMutation = (
	options?: UseMutationOptions<
		FirebaseUserCustomTokenResponse,
		GeneralizedError,
		Record<string, never>
	>,
) => {
	const { user: firebaseUser } = useContext(AuthContext);
	return useMutation<
		FirebaseUserCustomTokenResponse,
		GeneralizedError,
		Record<string, never>
	>(
		(params: Record<string, never>) =>
			createFirebaseAuthCustomToken(firebaseUser, params),
		{
			onError: (error: GeneralizedError) => {
				console.error('createFirebaseAuthCustomToken operation failed:', error);
			},
			onSuccess: (data: FirebaseUserCustomTokenResponse) => {
				console.log('createFirebaseAuthCustomToken operation successful', data);
			},
			...(options ?? {}),
		},
	);
};
