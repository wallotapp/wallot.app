import { useMutation } from '@tanstack/react-query';
import { createTransaction } from '@wallot/react/src/features/transactions/api/createTransaction';
import {
	CreateTransactionMutationData,
	CreateTransactionMutationError,
	CreateTransactionMutationParams,
	UseCreateTransactionMutationOptions,
} from '@wallot/react/src/features/transactions/types/TransactionReactTypes';

export const useCreateTransactionMutation = (
	options?: UseCreateTransactionMutationOptions,
) => {
	return useMutation<
		CreateTransactionMutationData,
		CreateTransactionMutationError,
		CreateTransactionMutationParams
	>(
		(params: CreateTransactionMutationParams) =>
			createTransaction(params),
		{
			onError: (error: CreateTransactionMutationError) => {
				console.error('Create operation failed:', error);
			},
			onSuccess: (data: CreateTransactionMutationData) => {
				console.log('Create operation successful', data);
			},
			...options,
		},
	);
};
