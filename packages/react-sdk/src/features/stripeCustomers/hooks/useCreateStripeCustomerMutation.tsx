import { useMutation } from '@tanstack/react-query';
import { createStripeCustomer } from '@wallot/react/src/features/stripeCustomers/api/createStripeCustomer';
import {
	CreateStripeCustomerMutationData,
	CreateStripeCustomerMutationError,
	CreateStripeCustomerMutationParams,
	UseCreateStripeCustomerMutationOptions,
} from '@wallot/react/src/features/stripeCustomers/types/StripeCustomerReactTypes';

export const useCreateStripeCustomerMutation = (
	options?: UseCreateStripeCustomerMutationOptions,
) => {
	return useMutation<
		CreateStripeCustomerMutationData,
		CreateStripeCustomerMutationError,
		CreateStripeCustomerMutationParams
	>(
		(params: CreateStripeCustomerMutationParams) =>
			createStripeCustomer(params),
		{
			onError: (error: CreateStripeCustomerMutationError) => {
				console.error('Create operation failed:', error);
			},
			onSuccess: (data: CreateStripeCustomerMutationData) => {
				console.log('Create operation successful', data);
			},
			...options,
		},
	);
};
