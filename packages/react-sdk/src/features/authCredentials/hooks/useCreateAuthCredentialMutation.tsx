import { useMutation } from '@tanstack/react-query';
import { createAuthCredential } from '@wallot/react/src/features/authCredentials/api/createAuthCredential';
import {
	CreateAuthCredentialMutationData,
	CreateAuthCredentialMutationError,
	CreateAuthCredentialMutationParams,
	UseCreateAuthCredentialMutationOptions,
} from '@wallot/react/src/features/authCredentials/types/AuthCredentialReactTypes';

export const useCreateAuthCredentialMutation = (
	options?: UseCreateAuthCredentialMutationOptions,
) => {
	return useMutation<
		CreateAuthCredentialMutationData,
		CreateAuthCredentialMutationError,
		CreateAuthCredentialMutationParams
	>(
		(params: CreateAuthCredentialMutationParams) =>
			createAuthCredential(params),
		{
			onError: (error: CreateAuthCredentialMutationError) => {
				console.error('Create operation failed:', error);
			},
			onSuccess: (data: CreateAuthCredentialMutationData) => {
				console.log('Create operation successful', data);
			},
			...options,
		},
	);
};
