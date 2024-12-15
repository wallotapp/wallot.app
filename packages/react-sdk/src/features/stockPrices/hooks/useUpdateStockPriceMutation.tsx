import { useMutation } from '@tanstack/react-query';
import { updateStockPrice } from '@wallot/react/src/features/stockPrices/api/updateStockPrice';
import {
	UpdateStockPriceMutationData,
	UpdateStockPriceMutationError,
	UpdateStockPriceMutationParams,
	UseUpdateStockPriceMutationOptions,
} from '@wallot/react/src/features/stockPrices/types/StockPriceReactTypes';

export const useUpdateStockPriceMutation = (
	options?: UseUpdateStockPriceMutationOptions,
) => {
	return useMutation<
		UpdateStockPriceMutationData,
		UpdateStockPriceMutationError,
		UpdateStockPriceMutationParams
	>((params: UpdateStockPriceMutationParams) => updateStockPrice(params), {
		onError: (error: UpdateStockPriceMutationError) => {
			console.error('Update operation failed:', error);
		},
		onSuccess: (data: UpdateStockPriceMutationData) => {
			console.log('Update operation successful', data);
		},
		...options,
	});
};
