import { useMutation } from '@tanstack/react-query';
import { updateAlpacaAchTransfer } from '@wallot/react/src/features/alpacaAchTransfers/api/updateAlpacaAchTransfer';
import {
	UpdateAlpacaAchTransferMutationData,
	UpdateAlpacaAchTransferMutationError,
	UpdateAlpacaAchTransferMutationParams,
	UseUpdateAlpacaAchTransferMutationOptions,
} from '@wallot/react/src/features/alpacaAchTransfers/types/AlpacaAchTransferReactTypes';

export const useUpdateAlpacaAchTransferMutation = (
	options?: UseUpdateAlpacaAchTransferMutationOptions,
) => {
	return useMutation<
		UpdateAlpacaAchTransferMutationData,
		UpdateAlpacaAchTransferMutationError,
		UpdateAlpacaAchTransferMutationParams
	>(
		(params: UpdateAlpacaAchTransferMutationParams) =>
			updateAlpacaAchTransfer(params),
		{
			onError: (error: UpdateAlpacaAchTransferMutationError) => {
				console.error('Update operation failed:', error);
			},
			onSuccess: (data: UpdateAlpacaAchTransferMutationData) => {
				console.log('Update operation successful', data);
			},
			...(options ?? {}),
		},
	);
};
