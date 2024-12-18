import { useMutation } from '@tanstack/react-query';
import { updatePaymentMethod } from '@wallot/react/src/features/paymentMethods/api/updatePaymentMethod';
import {
	UpdatePaymentMethodMutationData,
	UpdatePaymentMethodMutationError,
	UpdatePaymentMethodMutationParams,
	UseUpdatePaymentMethodMutationOptions,
} from '@wallot/react/src/features/paymentMethods/types/PaymentMethodReactTypes';

export const useUpdatePaymentMethodMutation = (
	options?: UseUpdatePaymentMethodMutationOptions,
) => {
	return useMutation<
		UpdatePaymentMethodMutationData,
		UpdatePaymentMethodMutationError,
		UpdatePaymentMethodMutationParams
	>(
		(params: UpdatePaymentMethodMutationParams) => updatePaymentMethod(params),
		{
			onError: (error: UpdatePaymentMethodMutationError) => {
				console.error('Update operation failed:', error);
			},
			onSuccess: (data: UpdatePaymentMethodMutationData) => {
				console.log('Update operation successful', data);
			},
			...(options ?? {}),
		},
	);
};
