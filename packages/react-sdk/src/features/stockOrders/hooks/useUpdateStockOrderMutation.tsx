import { useMutation } from '@tanstack/react-query';
import { updateStockOrder } from '@wallot/react/src/features/stockOrders/api/updateStockOrder';
import {
	UpdateStockOrderMutationData,
	UpdateStockOrderMutationError,
	UpdateStockOrderMutationParams,
	UseUpdateStockOrderMutationOptions,
} from '@wallot/react/src/features/stockOrders/types/StockOrderReactTypes';

export const useUpdateStockOrderMutation = (
	options?: UseUpdateStockOrderMutationOptions,
) => {
	return useMutation<
		UpdateStockOrderMutationData,
		UpdateStockOrderMutationError,
		UpdateStockOrderMutationParams
	>((params: UpdateStockOrderMutationParams) => updateStockOrder(params), {
		onError: (error: UpdateStockOrderMutationError) => {
			console.error('Update operation failed:', error);
		},
		onSuccess: (data: UpdateStockOrderMutationData) => {
			console.log('Update operation successful', data);
		},
		...options,
	});
};
