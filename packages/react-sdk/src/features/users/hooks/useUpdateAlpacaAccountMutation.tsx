import { useContext } from 'react';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { GeneralizedError } from 'ergonomic';
import { AuthContext } from 'ergonomic-react/src/features/authentication/providers/AuthProvider';
import {
	UpdateAlpacaAccountParams,
	UpdateAlpacaAccountResponse,
} from '@wallot/js';
import { updateAlpacaAccount } from '@wallot/react/src/features/users/api/updateAlpacaAccount';

export function useUpdateAlpacaAccountMutation(
	options?: UseMutationOptions<
		UpdateAlpacaAccountResponse,
		GeneralizedError,
		UpdateAlpacaAccountParams
	>,
) {
	const { user: firebaseUser } = useContext(AuthContext);
	return useMutation<
		UpdateAlpacaAccountResponse,
		GeneralizedError,
		UpdateAlpacaAccountParams
	>(
		(params: UpdateAlpacaAccountParams) =>
			updateAlpacaAccount(firebaseUser, params),
		{
			onError: (error: GeneralizedError) => {
				console.error('updateAlpacaAccount operation failed:', error);
			},
			onSuccess: (data: UpdateAlpacaAccountResponse) => {
				console.log('updateAlpacaAccount operation successful', data);
			},
			...(options ?? {}),
		},
	);
}
