import { useMutation } from '@tanstack/react-query';
import { createOpenAiModel } from '@wallot/react/src/features/openAiModels/api/createOpenAiModel';
import {
	CreateOpenAiModelMutationData,
	CreateOpenAiModelMutationError,
	CreateOpenAiModelMutationParams,
	UseCreateOpenAiModelMutationOptions,
} from '@wallot/react/src/features/openAiModels/types/OpenAiModelReactTypes';

export function useCreateOpenAiModelMutation(
	options?: UseCreateOpenAiModelMutationOptions,
) {
	return useMutation<
		CreateOpenAiModelMutationData,
		CreateOpenAiModelMutationError,
		CreateOpenAiModelMutationParams
	>((params: CreateOpenAiModelMutationParams) => createOpenAiModel(params), {
		onError: (error: CreateOpenAiModelMutationError) => {
			console.error('Create operation failed:', error);
		},
		onSuccess: (data: CreateOpenAiModelMutationData) => {
			console.log('Create operation successful', data);
		},
		...(options ?? {}),
	});
}
