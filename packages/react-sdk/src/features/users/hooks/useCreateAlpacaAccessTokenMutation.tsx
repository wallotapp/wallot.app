import { useContext } from 'react';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { GeneralizedError } from 'ergonomic';
import { AuthContext } from 'ergonomic-react/src/features/authentication/providers/AuthProvider';
import {
	CreateAlpacaAccessTokenParams,
	CreateAlpacaAccessTokenResponse,
} from '@wallot/js';
import { createAlpacaAccessToken } from '@wallot/react/src/features/users/api/createAlpacaAccessToken';

export function useCreateAlpacaAccessTokenMutation(
	options?: UseMutationOptions<
		CreateAlpacaAccessTokenResponse,
		GeneralizedError,
		CreateAlpacaAccessTokenParams
	>,
) {
	const { user: firebaseUser } = useContext(AuthContext);
	return useMutation<
		CreateAlpacaAccessTokenResponse,
		GeneralizedError,
		CreateAlpacaAccessTokenParams
	>(
		(params: CreateAlpacaAccessTokenParams) =>
			createAlpacaAccessToken(firebaseUser, params),
		{
			onError: (error: GeneralizedError) => {
				console.error('createAlpacaAccessToken operation failed:', error);
			},
			onSuccess: (data: CreateAlpacaAccessTokenResponse) => {
				console.log('createAlpacaAccessToken operation successful', data);
			},
			...(options ?? {}),
		},
	);
}
