import { useMutation } from '@tanstack/react-query';
import { updateIdentityVerificationDocument } from '@wallot/react/src/features/identityVerificationDocuments/api/updateIdentityVerificationDocument';
import {
	UpdateIdentityVerificationDocumentMutationData,
	UpdateIdentityVerificationDocumentMutationError,
	UpdateIdentityVerificationDocumentMutationParams,
	UseUpdateIdentityVerificationDocumentMutationOptions,
} from '@wallot/react/src/features/identityVerificationDocuments/types/IdentityVerificationDocumentReactTypes';

export const useUpdateIdentityVerificationDocumentMutation = (
	options?: UseUpdateIdentityVerificationDocumentMutationOptions,
) => {
	return useMutation<
		UpdateIdentityVerificationDocumentMutationData,
		UpdateIdentityVerificationDocumentMutationError,
		UpdateIdentityVerificationDocumentMutationParams
	>(
		(params: UpdateIdentityVerificationDocumentMutationParams) =>
			updateIdentityVerificationDocument(params),
		{
			onError: (error: UpdateIdentityVerificationDocumentMutationError) => {
				console.error('Update operation failed:', error);
			},
			onSuccess: (data: UpdateIdentityVerificationDocumentMutationData) => {
				console.log('Update operation successful', data);
			},
			...(options ?? {}),
		},
	);
};
