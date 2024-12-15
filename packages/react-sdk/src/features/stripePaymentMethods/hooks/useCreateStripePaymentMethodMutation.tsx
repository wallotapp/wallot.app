import { useMutation } from '@tanstack/react-query';
import { createStripePaymentMethod } from '@wallot/react/src/features/stripePaymentMethods/api/createStripePaymentMethod';
import {
	CreateStripePaymentMethodMutationData,
	CreateStripePaymentMethodMutationError,
	CreateStripePaymentMethodMutationParams,
	UseCreateStripePaymentMethodMutationOptions,
} from '@wallot/react/src/features/stripePaymentMethods/types/StripePaymentMethodReactTypes';

export const useCreateStripePaymentMethodMutation = (
	options?: UseCreateStripePaymentMethodMutationOptions,
) => {
	return useMutation<
		CreateStripePaymentMethodMutationData,
		CreateStripePaymentMethodMutationError,
		CreateStripePaymentMethodMutationParams
	>(
		(params: CreateStripePaymentMethodMutationParams) =>
			createStripePaymentMethod(params),
		{
			onError: (error: CreateStripePaymentMethodMutationError) => {
				console.error('Create operation failed:', error);
			},
			onSuccess: (data: CreateStripePaymentMethodMutationData) => {
				console.log('Create operation successful', data);
			},
			...options,
		},
	);
};
