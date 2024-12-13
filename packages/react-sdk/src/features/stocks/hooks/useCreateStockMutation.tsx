import { useMutation } from '@tanstack/react-query';
import { createStock } from '@wallot/react/src/features/stocks/api/createStock';
import {
	CreateStockMutationData,
	CreateStockMutationError,
	CreateStockMutationParams,
	UseCreateStockMutationOptions,
} from '@wallot/react/src/features/stocks/types/StockReactTypes';

export const useCreateStockMutation = (
	options?: UseCreateStockMutationOptions,
) => {
	return useMutation<
		CreateStockMutationData,
		CreateStockMutationError,
		CreateStockMutationParams
	>((params: CreateStockMutationParams) => createStock(params), {
		onError: (error: CreateStockMutationError) => {
			console.error('Create operation failed:', error);
		},
		onSuccess: (data: CreateStockMutationData) => {
			console.log('Create operation successful', data);
		},
		...options,
	});
};
