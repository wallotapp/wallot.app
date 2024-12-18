import { useMutation } from '@tanstack/react-query';
import { createStripeFinancialConnectionAccount } from '@wallot/react/src/features/stripeFinancialConnectionAccounts/api/createStripeFinancialConnectionAccount';
import {
	CreateStripeFinancialConnectionAccountMutationData,
	CreateStripeFinancialConnectionAccountMutationError,
	CreateStripeFinancialConnectionAccountMutationParams,
	UseCreateStripeFinancialConnectionAccountMutationOptions,
} from '@wallot/react/src/features/stripeFinancialConnectionAccounts/types/StripeFinancialConnectionAccountReactTypes';

export const useCreateStripeFinancialConnectionAccountMutation = (
	options?: UseCreateStripeFinancialConnectionAccountMutationOptions,
) => {
	return useMutation<
		CreateStripeFinancialConnectionAccountMutationData,
		CreateStripeFinancialConnectionAccountMutationError,
		CreateStripeFinancialConnectionAccountMutationParams
	>(
		(params: CreateStripeFinancialConnectionAccountMutationParams) =>
			createStripeFinancialConnectionAccount(params),
		{
			onError: (error: CreateStripeFinancialConnectionAccountMutationError) => {
				console.error('Create operation failed:', error);
			},
			onSuccess: (data: CreateStripeFinancialConnectionAccountMutationData) => {
				console.log('Create operation successful', data);
			},
			...(options ?? {}),
		},
	);
};
