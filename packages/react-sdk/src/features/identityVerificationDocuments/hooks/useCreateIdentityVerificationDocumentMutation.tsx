import { useMutation } from '@tanstack/react-query';
import { createIdentityVerificationDocument } from '@wallot/react/src/features/identityVerificationDocuments/api/createIdentityVerificationDocument';
import {
	CreateIdentityVerificationDocumentMutationData,
	CreateIdentityVerificationDocumentMutationError,
	CreateIdentityVerificationDocumentMutationParams,
	UseCreateIdentityVerificationDocumentMutationOptions,
} from '@wallot/react/src/features/identityVerificationDocuments/types/IdentityVerificationDocumentReactTypes';

export const useCreateIdentityVerificationDocumentMutation = (options?: UseCreateIdentityVerificationDocumentMutationOptions) => {
	return useMutation<CreateIdentityVerificationDocumentMutationData, CreateIdentityVerificationDocumentMutationError, CreateIdentityVerificationDocumentMutationParams>(
		(params: CreateIdentityVerificationDocumentMutationParams) => createIdentityVerificationDocument(params),
		{
			onError: (error: CreateIdentityVerificationDocumentMutationError) => {
				console.error('Create operation failed:', error);
			},
			onSuccess: (data: CreateIdentityVerificationDocumentMutationData) => {
				console.log('Create operation successful', data);
			},
			...(options ?? {}),
		},
	);
};
