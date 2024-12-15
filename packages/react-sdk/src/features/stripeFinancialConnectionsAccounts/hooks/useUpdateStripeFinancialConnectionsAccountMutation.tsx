import { useMutation } from '@tanstack/react-query';
import { updateStripeFinancialConnectionsAccount } from '@wallot/react/src/features/stripeFinancialConnectionsAccounts/api/updateStripeFinancialConnectionsAccount';
import {
	UpdateStripeFinancialConnectionsAccountMutationData,
	UpdateStripeFinancialConnectionsAccountMutationError,
	UpdateStripeFinancialConnectionsAccountMutationParams,
	UseUpdateStripeFinancialConnectionsAccountMutationOptions,
} from '@wallot/react/src/features/stripeFinancialConnectionsAccounts/types/StripeFinancialConnectionsAccountReactTypes';

export const useUpdateStripeFinancialConnectionsAccountMutation = (
	options?: UseUpdateStripeFinancialConnectionsAccountMutationOptions,
) => {
	return useMutation<
		UpdateStripeFinancialConnectionsAccountMutationData,
		UpdateStripeFinancialConnectionsAccountMutationError,
		UpdateStripeFinancialConnectionsAccountMutationParams
	>(
		(params: UpdateStripeFinancialConnectionsAccountMutationParams) =>
			updateStripeFinancialConnectionsAccount(params),
		{
			onError: (
				error: UpdateStripeFinancialConnectionsAccountMutationError,
			) => {
				console.error('Update operation failed:', error);
			},
			onSuccess: (
				data: UpdateStripeFinancialConnectionsAccountMutationData,
			) => {
				console.log('Update operation successful', data);
			},
			...options,
		},
	);
};
