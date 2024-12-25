import { useMutation } from '@tanstack/react-query';
import { createOrder } from '@wallot/react/src/features/orders/api/createOrder';
import {
	CreateOrderMutationData,
	CreateOrderMutationError,
	CreateOrderMutationParams,
	UseCreateOrderMutationOptions,
} from '@wallot/react/src/features/orders/types/OrderReactTypes';

export const useCreateOrderMutation = (
	options?: UseCreateOrderMutationOptions,
) => {
	return useMutation<
		CreateOrderMutationData,
		CreateOrderMutationError,
		CreateOrderMutationParams
	>((params: CreateOrderMutationParams) => createOrder(params), {
		onError: (error: CreateOrderMutationError) => {
			console.error('Create operation failed:', error);
		},
		onSuccess: (data: CreateOrderMutationData) => {
			console.log('Create operation successful', data);
		},
		...(options ?? {}),
	});
};
