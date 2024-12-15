import { useMutation } from '@tanstack/react-query';
import { createStripeTransaction } from '@wallot/react/src/features/stripeTransactions/api/createStripeTransaction';
import {
	CreateStripeTransactionMutationData,
	CreateStripeTransactionMutationError,
	CreateStripeTransactionMutationParams,
	UseCreateStripeTransactionMutationOptions,
} from '@wallot/react/src/features/stripeTransactions/types/StripeTransactionReactTypes';

export const useCreateStripeTransactionMutation = (
	options?: UseCreateStripeTransactionMutationOptions,
) => {
	return useMutation<
		CreateStripeTransactionMutationData,
		CreateStripeTransactionMutationError,
		CreateStripeTransactionMutationParams
	>(
		(params: CreateStripeTransactionMutationParams) =>
			createStripeTransaction(params),
		{
			onError: (error: CreateStripeTransactionMutationError) => {
				console.error('Create operation failed:', error);
			},
			onSuccess: (data: CreateStripeTransactionMutationData) => {
				console.log('Create operation successful', data);
			},
			...options,
		},
	);
};
