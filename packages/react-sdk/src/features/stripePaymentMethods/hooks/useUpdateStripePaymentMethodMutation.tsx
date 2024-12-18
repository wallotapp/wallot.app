import { useMutation } from '@tanstack/react-query';
import { updateStripePaymentMethod } from '@wallot/react/src/features/stripePaymentMethods/api/updateStripePaymentMethod';
import {
	UpdateStripePaymentMethodMutationData,
	UpdateStripePaymentMethodMutationError,
	UpdateStripePaymentMethodMutationParams,
	UseUpdateStripePaymentMethodMutationOptions,
} from '@wallot/react/src/features/stripePaymentMethods/types/StripePaymentMethodReactTypes';

export const useUpdateStripePaymentMethodMutation = (
	options?: UseUpdateStripePaymentMethodMutationOptions,
) => {
	return useMutation<
		UpdateStripePaymentMethodMutationData,
		UpdateStripePaymentMethodMutationError,
		UpdateStripePaymentMethodMutationParams
	>(
		(params: UpdateStripePaymentMethodMutationParams) =>
			updateStripePaymentMethod(params),
		{
			onError: (error: UpdateStripePaymentMethodMutationError) => {
				console.error('Update operation failed:', error);
			},
			onSuccess: (data: UpdateStripePaymentMethodMutationData) => {
				console.log('Update operation successful', data);
			},
			...(options ?? {}),
		},
	);
};
