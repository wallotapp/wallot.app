import { useMutation } from '@tanstack/react-query';
import { createStockOrder } from '@wallot/react/src/features/stockOrders/api/createStockOrder';
import {
	CreateStockOrderMutationData,
	CreateStockOrderMutationError,
	CreateStockOrderMutationParams,
	UseCreateStockOrderMutationOptions,
} from '@wallot/react/src/features/stockOrders/types/StockOrderReactTypes';

export const useCreateStockOrderMutation = (
	options?: UseCreateStockOrderMutationOptions,
) => {
	return useMutation<
		CreateStockOrderMutationData,
		CreateStockOrderMutationError,
		CreateStockOrderMutationParams
	>((params: CreateStockOrderMutationParams) => createStockOrder(params), {
		onError: (error: CreateStockOrderMutationError) => {
			console.error('Create operation failed:', error);
		},
		onSuccess: (data: CreateStockOrderMutationData) => {
			console.log('Create operation successful', data);
		},
		...options,
	});
};
