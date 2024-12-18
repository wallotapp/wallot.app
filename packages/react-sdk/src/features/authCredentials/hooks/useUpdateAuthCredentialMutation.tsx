import { useMutation } from '@tanstack/react-query';
import { updateAuthCredential } from '@wallot/react/src/features/authCredentials/api/updateAuthCredential';
import {
	UpdateAuthCredentialMutationData,
	UpdateAuthCredentialMutationError,
	UpdateAuthCredentialMutationParams,
	UseUpdateAuthCredentialMutationOptions,
} from '@wallot/react/src/features/authCredentials/types/AuthCredentialReactTypes';

export const useUpdateAuthCredentialMutation = (
	options?: UseUpdateAuthCredentialMutationOptions,
) => {
	return useMutation<
		UpdateAuthCredentialMutationData,
		UpdateAuthCredentialMutationError,
		UpdateAuthCredentialMutationParams
	>(
		(params: UpdateAuthCredentialMutationParams) =>
			updateAuthCredential(params),
		{
			onError: (error: UpdateAuthCredentialMutationError) => {
				console.error('Update operation failed:', error);
			},
			onSuccess: (data: UpdateAuthCredentialMutationData) => {
				console.log('Update operation successful', data);
			},
			...(options ?? {}),
		},
	);
};
