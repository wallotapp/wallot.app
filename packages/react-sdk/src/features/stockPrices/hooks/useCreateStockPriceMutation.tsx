import { useMutation } from '@tanstack/react-query';
import { createStockPrice } from '@wallot/react/src/features/stockPrices/api/createStockPrice';
import {
	CreateStockPriceMutationData,
	CreateStockPriceMutationError,
	CreateStockPriceMutationParams,
	UseCreateStockPriceMutationOptions,
} from '@wallot/react/src/features/stockPrices/types/StockPriceReactTypes';

export const useCreateStockPriceMutation = (
	options?: UseCreateStockPriceMutationOptions,
) => {
	return useMutation<
		CreateStockPriceMutationData,
		CreateStockPriceMutationError,
		CreateStockPriceMutationParams
	>((params: CreateStockPriceMutationParams) => createStockPrice(params), {
		onError: (error: CreateStockPriceMutationError) => {
			console.error('Create operation failed:', error);
		},
		onSuccess: (data: CreateStockPriceMutationData) => {
			console.log('Create operation successful', data);
		},
		...options,
	});
};
