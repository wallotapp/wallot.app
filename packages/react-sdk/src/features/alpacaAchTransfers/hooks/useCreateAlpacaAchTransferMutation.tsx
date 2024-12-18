import { useMutation } from '@tanstack/react-query';
import { createAlpacaAchTransfer } from '@wallot/react/src/features/alpacaAchTransfers/api/createAlpacaAchTransfer';
import {
	CreateAlpacaAchTransferMutationData,
	CreateAlpacaAchTransferMutationError,
	CreateAlpacaAchTransferMutationParams,
	UseCreateAlpacaAchTransferMutationOptions,
} from '@wallot/react/src/features/alpacaAchTransfers/types/AlpacaAchTransferReactTypes';

export const useCreateAlpacaAchTransferMutation = (
	options?: UseCreateAlpacaAchTransferMutationOptions,
) => {
	return useMutation<
		CreateAlpacaAchTransferMutationData,
		CreateAlpacaAchTransferMutationError,
		CreateAlpacaAchTransferMutationParams
	>(
		(params: CreateAlpacaAchTransferMutationParams) =>
			createAlpacaAchTransfer(params),
		{
			onError: (error: CreateAlpacaAchTransferMutationError) => {
				console.error('Create operation failed:', error);
			},
			onSuccess: (data: CreateAlpacaAchTransferMutationData) => {
				console.log('Create operation successful', data);
			},
			...(options ?? {}),
		},
	);
};
