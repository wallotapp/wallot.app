import { useMutation } from '@tanstack/react-query';
import { updateOrder } from '@wallot/react/src/features/orders/api/updateOrder';
import {
	UpdateOrderMutationData,
	UpdateOrderMutationError,
	UpdateOrderMutationParams,
	UseUpdateOrderMutationOptions,
} from '@wallot/react/src/features/orders/types/OrderReactTypes';

export const useUpdateOrderMutation = (
	options?: UseUpdateOrderMutationOptions,
) => {
	return useMutation<
		UpdateOrderMutationData,
		UpdateOrderMutationError,
		UpdateOrderMutationParams
	>(
		(params: UpdateOrderMutationParams) =>
			updateOrder(params),
		{
			onError: (error: UpdateOrderMutationError) => {
				console.error('Update operation failed:', error);
			},
			onSuccess: (data: UpdateOrderMutationData) => {
				console.log('Update operation successful', data);
			},
			...options,
		},
	);
};
