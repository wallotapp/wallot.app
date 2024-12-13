import { useMutation } from '@tanstack/react-query';
import { updateStock } from '@wallot/react/src/features/stocks/api/updateStock';
import {
	UpdateStockMutationData,
	UpdateStockMutationError,
	UpdateStockMutationParams,
	UseUpdateStockMutationOptions,
} from '@wallot/react/src/features/stocks/types/StockReactTypes';

export const useUpdateStockMutation = (
	options?: UseUpdateStockMutationOptions,
) => {
	return useMutation<
		UpdateStockMutationData,
		UpdateStockMutationError,
		UpdateStockMutationParams
	>((params: UpdateStockMutationParams) => updateStock(params), {
		onError: (error: UpdateStockMutationError) => {
			console.error('Update operation failed:', error);
		},
		onSuccess: (data: UpdateStockMutationData) => {
			console.log('Update operation successful', data);
		},
		...options,
	});
};
