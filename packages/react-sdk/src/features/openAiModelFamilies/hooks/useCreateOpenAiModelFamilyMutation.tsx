import { useMutation } from '@tanstack/react-query';
import { createOpenAiModelFamily } from '@wallot/react/src/features/openAiModelFamilies/api/createOpenAiModelFamily';
import {
	CreateOpenAiModelFamilyMutationData,
	CreateOpenAiModelFamilyMutationError,
	CreateOpenAiModelFamilyMutationParams,
	UseCreateOpenAiModelFamilyMutationOptions,
} from '@wallot/react/src/features/openAiModelFamilies/types/OpenAiModelFamilyReactTypes';

export const useCreateOpenAiModelFamilyMutation = (
	options?: UseCreateOpenAiModelFamilyMutationOptions,
) => {
	return useMutation<
		CreateOpenAiModelFamilyMutationData,
		CreateOpenAiModelFamilyMutationError,
		CreateOpenAiModelFamilyMutationParams
	>(
		(params: CreateOpenAiModelFamilyMutationParams) =>
			createOpenAiModelFamily(params),
		{
			onError: (error: CreateOpenAiModelFamilyMutationError) => {
				console.error('Create operation failed:', error);
			},
			onSuccess: (data: CreateOpenAiModelFamilyMutationData) => {
				console.log('Create operation successful', data);
			},
			...options,
		},
	);
};
