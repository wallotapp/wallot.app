import { useMutation } from '@tanstack/react-query';
import { createAlphaVantageStockPrice } from '@wallot/react/src/features/alphaVantageStockPrices/api/createAlphaVantageStockPrice';
import {
	CreateAlphaVantageStockPriceMutationData,
	CreateAlphaVantageStockPriceMutationError,
	CreateAlphaVantageStockPriceMutationParams,
	UseCreateAlphaVantageStockPriceMutationOptions,
} from '@wallot/react/src/features/alphaVantageStockPrices/types/AlphaVantageStockPriceReactTypes';

export const useCreateAlphaVantageStockPriceMutation = (
	options?: UseCreateAlphaVantageStockPriceMutationOptions,
) => {
	return useMutation<
		CreateAlphaVantageStockPriceMutationData,
		CreateAlphaVantageStockPriceMutationError,
		CreateAlphaVantageStockPriceMutationParams
	>(
		(params: CreateAlphaVantageStockPriceMutationParams) =>
			createAlphaVantageStockPrice(params),
		{
			onError: (error: CreateAlphaVantageStockPriceMutationError) => {
				console.error('Create operation failed:', error);
			},
			onSuccess: (data: CreateAlphaVantageStockPriceMutationData) => {
				console.log('Create operation successful', data);
			},
			...options,
		},
	);
};
