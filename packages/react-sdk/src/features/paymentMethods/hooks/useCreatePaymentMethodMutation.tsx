import { useMutation } from '@tanstack/react-query';
import { createPaymentMethod } from '@wallot/react/src/features/paymentMethods/api/createPaymentMethod';
import {
	CreatePaymentMethodMutationData,
	CreatePaymentMethodMutationError,
	CreatePaymentMethodMutationParams,
	UseCreatePaymentMethodMutationOptions,
} from '@wallot/react/src/features/paymentMethods/types/PaymentMethodReactTypes';

export const useCreatePaymentMethodMutation = (
	options?: UseCreatePaymentMethodMutationOptions,
) => {
	return useMutation<
		CreatePaymentMethodMutationData,
		CreatePaymentMethodMutationError,
		CreatePaymentMethodMutationParams
	>(
		(params: CreatePaymentMethodMutationParams) => createPaymentMethod(params),
		{
			onError: (error: CreatePaymentMethodMutationError) => {
				console.error('Create operation failed:', error);
			},
			onSuccess: (data: CreatePaymentMethodMutationData) => {
				console.log('Create operation successful', data);
			},
			...options,
		},
	);
};
