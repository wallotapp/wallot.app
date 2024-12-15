import { useMutation } from '@tanstack/react-query';
import { updateOpenAiModelFamily } from '@wallot/react/src/features/openAiModelFamilies/api/updateOpenAiModelFamily';
import {
	UpdateOpenAiModelFamilyMutationData,
	UpdateOpenAiModelFamilyMutationError,
	UpdateOpenAiModelFamilyMutationParams,
	UseUpdateOpenAiModelFamilyMutationOptions,
} from '@wallot/react/src/features/openAiModelFamilies/types/OpenAiModelFamilyReactTypes';

export const useUpdateOpenAiModelFamilyMutation = (
	options?: UseUpdateOpenAiModelFamilyMutationOptions,
) => {
	return useMutation<
		UpdateOpenAiModelFamilyMutationData,
		UpdateOpenAiModelFamilyMutationError,
		UpdateOpenAiModelFamilyMutationParams
	>(
		(params: UpdateOpenAiModelFamilyMutationParams) =>
			updateOpenAiModelFamily(params),
		{
			onError: (error: UpdateOpenAiModelFamilyMutationError) => {
				console.error('Update operation failed:', error);
			},
			onSuccess: (data: UpdateOpenAiModelFamilyMutationData) => {
				console.log('Update operation successful', data);
			},
			...options,
		},
	);
};
