import { useMutation } from '@tanstack/react-query';
import { updateStripeTransaction } from '@wallot/react/src/features/stripeTransactions/api/updateStripeTransaction';
import {
	UpdateStripeTransactionMutationData,
	UpdateStripeTransactionMutationError,
	UpdateStripeTransactionMutationParams,
	UseUpdateStripeTransactionMutationOptions,
} from '@wallot/react/src/features/stripeTransactions/types/StripeTransactionReactTypes';

export const useUpdateStripeTransactionMutation = (
	options?: UseUpdateStripeTransactionMutationOptions,
) => {
	return useMutation<
		UpdateStripeTransactionMutationData,
		UpdateStripeTransactionMutationError,
		UpdateStripeTransactionMutationParams
	>(
		(params: UpdateStripeTransactionMutationParams) =>
			updateStripeTransaction(params),
		{
			onError: (error: UpdateStripeTransactionMutationError) => {
				console.error('Update operation failed:', error);
			},
			onSuccess: (data: UpdateStripeTransactionMutationData) => {
				console.log('Update operation successful', data);
			},
			...options,
		},
	);
};
