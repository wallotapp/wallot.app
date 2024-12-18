import { useMutation } from '@tanstack/react-query';
import { updateStripeFinancialConnectionAccount } from '@wallot/react/src/features/stripeFinancialConnectionAccounts/api/updateStripeFinancialConnectionAccount';
import {
	UpdateStripeFinancialConnectionAccountMutationData,
	UpdateStripeFinancialConnectionAccountMutationError,
	UpdateStripeFinancialConnectionAccountMutationParams,
	UseUpdateStripeFinancialConnectionAccountMutationOptions,
} from '@wallot/react/src/features/stripeFinancialConnectionAccounts/types/StripeFinancialConnectionAccountReactTypes';

export const useUpdateStripeFinancialConnectionAccountMutation = (
	options?: UseUpdateStripeFinancialConnectionAccountMutationOptions,
) => {
	return useMutation<
		UpdateStripeFinancialConnectionAccountMutationData,
		UpdateStripeFinancialConnectionAccountMutationError,
		UpdateStripeFinancialConnectionAccountMutationParams
	>(
		(params: UpdateStripeFinancialConnectionAccountMutationParams) =>
			updateStripeFinancialConnectionAccount(params),
		{
			onError: (error: UpdateStripeFinancialConnectionAccountMutationError) => {
				console.error('Update operation failed:', error);
			},
			onSuccess: (data: UpdateStripeFinancialConnectionAccountMutationData) => {
				console.log('Update operation successful', data);
			},
			...(options ?? {}),
		},
	);
};
