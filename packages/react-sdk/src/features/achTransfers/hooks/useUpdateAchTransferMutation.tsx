import { useMutation } from '@tanstack/react-query';
import { updateAchTransfer } from '@wallot/react/src/features/achTransfers/api/updateAchTransfer';
import {
	UpdateAchTransferMutationData,
	UpdateAchTransferMutationError,
	UpdateAchTransferMutationParams,
	UseUpdateAchTransferMutationOptions,
} from '@wallot/react/src/features/achTransfers/types/AchTransferReactTypes';

export const useUpdateAchTransferMutation = (
	options?: UseUpdateAchTransferMutationOptions,
) => {
	return useMutation<
		UpdateAchTransferMutationData,
		UpdateAchTransferMutationError,
		UpdateAchTransferMutationParams
	>((params: UpdateAchTransferMutationParams) => updateAchTransfer(params), {
		onError: (error: UpdateAchTransferMutationError) => {
			console.error('Update operation failed:', error);
		},
		onSuccess: (data: UpdateAchTransferMutationData) => {
			console.log('Update operation successful', data);
		},
		...options,
	});
};
