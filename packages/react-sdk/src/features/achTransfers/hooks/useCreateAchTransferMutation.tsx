import { useMutation } from '@tanstack/react-query';
import { createAchTransfer } from '@wallot/react/src/features/achTransfers/api/createAchTransfer';
import {
	CreateAchTransferMutationData,
	CreateAchTransferMutationError,
	CreateAchTransferMutationParams,
	UseCreateAchTransferMutationOptions,
} from '@wallot/react/src/features/achTransfers/types/AchTransferReactTypes';

export function useCreateAchTransferMutation(
	options?: UseCreateAchTransferMutationOptions,
) {
	return useMutation<
		CreateAchTransferMutationData,
		CreateAchTransferMutationError,
		CreateAchTransferMutationParams
	>((params: CreateAchTransferMutationParams) => createAchTransfer(params), {
		onError: (error: CreateAchTransferMutationError) => {
			console.error('Create operation failed:', error);
		},
		onSuccess: (data: CreateAchTransferMutationData) => {
			console.log('Create operation successful', data);
		},
		...(options ?? {}),
	});
}
