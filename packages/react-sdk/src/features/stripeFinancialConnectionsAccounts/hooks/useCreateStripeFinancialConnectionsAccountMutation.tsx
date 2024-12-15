import { useMutation } from '@tanstack/react-query';
import { createStripeFinancialConnectionsAccount } from '@wallot/react/src/features/stripeFinancialConnectionsAccounts/api/createStripeFinancialConnectionsAccount';
import {
	CreateStripeFinancialConnectionsAccountMutationData,
	CreateStripeFinancialConnectionsAccountMutationError,
	CreateStripeFinancialConnectionsAccountMutationParams,
	UseCreateStripeFinancialConnectionsAccountMutationOptions,
} from '@wallot/react/src/features/stripeFinancialConnectionsAccounts/types/StripeFinancialConnectionsAccountReactTypes';

export const useCreateStripeFinancialConnectionsAccountMutation = (
	options?: UseCreateStripeFinancialConnectionsAccountMutationOptions,
) => {
	return useMutation<
		CreateStripeFinancialConnectionsAccountMutationData,
		CreateStripeFinancialConnectionsAccountMutationError,
		CreateStripeFinancialConnectionsAccountMutationParams
	>(
		(params: CreateStripeFinancialConnectionsAccountMutationParams) =>
			createStripeFinancialConnectionsAccount(params),
		{
			onError: (
				error: CreateStripeFinancialConnectionsAccountMutationError,
			) => {
				console.error('Create operation failed:', error);
			},
			onSuccess: (
				data: CreateStripeFinancialConnectionsAccountMutationData,
			) => {
				console.log('Create operation successful', data);
			},
			...options,
		},
	);
};
