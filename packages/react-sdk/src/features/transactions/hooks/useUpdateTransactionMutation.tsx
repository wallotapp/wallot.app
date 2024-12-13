import { useMutation } from '@tanstack/react-query';
import { updateTransaction } from '@wallot/react/src/features/transactions/api/updateTransaction';
import {
	UpdateTransactionMutationData,
	UpdateTransactionMutationError,
	UpdateTransactionMutationParams,
	UseUpdateTransactionMutationOptions,
} from '@wallot/react/src/features/transactions/types/TransactionReactTypes';

export const useUpdateTransactionMutation = (
	options?: UseUpdateTransactionMutationOptions,
) => {
	return useMutation<
		UpdateTransactionMutationData,
		UpdateTransactionMutationError,
		UpdateTransactionMutationParams
	>(
		(params: UpdateTransactionMutationParams) =>
			updateTransaction(params),
		{
			onError: (error: UpdateTransactionMutationError) => {
				console.error('Update operation failed:', error);
			},
			onSuccess: (data: UpdateTransactionMutationData) => {
				console.log('Update operation successful', data);
			},
			...options,
		},
	);
};
