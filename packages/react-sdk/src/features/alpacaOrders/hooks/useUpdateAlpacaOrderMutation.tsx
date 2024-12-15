import { useMutation } from '@tanstack/react-query';
import { updateAlpacaOrder } from '@wallot/react/src/features/alpacaOrders/api/updateAlpacaOrder';
import {
	UpdateAlpacaOrderMutationData,
	UpdateAlpacaOrderMutationError,
	UpdateAlpacaOrderMutationParams,
	UseUpdateAlpacaOrderMutationOptions,
} from '@wallot/react/src/features/alpacaOrders/types/AlpacaOrderReactTypes';

export const useUpdateAlpacaOrderMutation = (
	options?: UseUpdateAlpacaOrderMutationOptions,
) => {
	return useMutation<
		UpdateAlpacaOrderMutationData,
		UpdateAlpacaOrderMutationError,
		UpdateAlpacaOrderMutationParams
	>((params: UpdateAlpacaOrderMutationParams) => updateAlpacaOrder(params), {
		onError: (error: UpdateAlpacaOrderMutationError) => {
			console.error('Update operation failed:', error);
		},
		onSuccess: (data: UpdateAlpacaOrderMutationData) => {
			console.log('Update operation successful', data);
		},
		...options,
	});
};
