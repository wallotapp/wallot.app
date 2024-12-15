import { useMutation } from '@tanstack/react-query';
import { updateStripeCustomer } from '@wallot/react/src/features/stripeCustomers/api/updateStripeCustomer';
import {
	UpdateStripeCustomerMutationData,
	UpdateStripeCustomerMutationError,
	UpdateStripeCustomerMutationParams,
	UseUpdateStripeCustomerMutationOptions,
} from '@wallot/react/src/features/stripeCustomers/types/StripeCustomerReactTypes';

export const useUpdateStripeCustomerMutation = (
	options?: UseUpdateStripeCustomerMutationOptions,
) => {
	return useMutation<
		UpdateStripeCustomerMutationData,
		UpdateStripeCustomerMutationError,
		UpdateStripeCustomerMutationParams
	>(
		(params: UpdateStripeCustomerMutationParams) =>
			updateStripeCustomer(params),
		{
			onError: (error: UpdateStripeCustomerMutationError) => {
				console.error('Update operation failed:', error);
			},
			onSuccess: (data: UpdateStripeCustomerMutationData) => {
				console.log('Update operation successful', data);
			},
			...options,
		},
	);
};
