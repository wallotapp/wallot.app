import { useMutation } from '@tanstack/react-query';
import { updateAlphaVantageStockPrice } from '@wallot/react/src/features/alphaVantageStockPrices/api/updateAlphaVantageStockPrice';
import {
	UpdateAlphaVantageStockPriceMutationData,
	UpdateAlphaVantageStockPriceMutationError,
	UpdateAlphaVantageStockPriceMutationParams,
	UseUpdateAlphaVantageStockPriceMutationOptions,
} from '@wallot/react/src/features/alphaVantageStockPrices/types/AlphaVantageStockPriceReactTypes';

export const useUpdateAlphaVantageStockPriceMutation = (
	options?: UseUpdateAlphaVantageStockPriceMutationOptions,
) => {
	return useMutation<
		UpdateAlphaVantageStockPriceMutationData,
		UpdateAlphaVantageStockPriceMutationError,
		UpdateAlphaVantageStockPriceMutationParams
	>(
		(params: UpdateAlphaVantageStockPriceMutationParams) =>
			updateAlphaVantageStockPrice(params),
		{
			onError: (error: UpdateAlphaVantageStockPriceMutationError) => {
				console.error('Update operation failed:', error);
			},
			onSuccess: (data: UpdateAlphaVantageStockPriceMutationData) => {
				console.log('Update operation successful', data);
			},
			...(options ?? {}),
		},
	);
};
