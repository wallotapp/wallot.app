import { useMutation } from '@tanstack/react-query';
import { updateOpenAiModel } from '@wallot/react/src/features/openAiModels/api/updateOpenAiModel';
import {
	UpdateOpenAiModelMutationData,
	UpdateOpenAiModelMutationError,
	UpdateOpenAiModelMutationParams,
	UseUpdateOpenAiModelMutationOptions,
} from '@wallot/react/src/features/openAiModels/types/OpenAiModelReactTypes';

export const useUpdateOpenAiModelMutation = (
	options?: UseUpdateOpenAiModelMutationOptions,
) => {
	return useMutation<
		UpdateOpenAiModelMutationData,
		UpdateOpenAiModelMutationError,
		UpdateOpenAiModelMutationParams
	>((params: UpdateOpenAiModelMutationParams) => updateOpenAiModel(params), {
		onError: (error: UpdateOpenAiModelMutationError) => {
			console.error('Update operation failed:', error);
		},
		onSuccess: (data: UpdateOpenAiModelMutationData) => {
			console.log('Update operation successful', data);
		},
		...options,
	});
};
