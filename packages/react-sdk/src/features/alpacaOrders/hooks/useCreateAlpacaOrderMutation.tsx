import { useMutation } from '@tanstack/react-query';
import { createAlpacaOrder } from '@wallot/react/src/features/alpacaOrders/api/createAlpacaOrder';
import {
	CreateAlpacaOrderMutationData,
	CreateAlpacaOrderMutationError,
	CreateAlpacaOrderMutationParams,
	UseCreateAlpacaOrderMutationOptions,
} from '@wallot/react/src/features/alpacaOrders/types/AlpacaOrderReactTypes';

export const useCreateAlpacaOrderMutation = (
	options?: UseCreateAlpacaOrderMutationOptions,
) => {
	return useMutation<
		CreateAlpacaOrderMutationData,
		CreateAlpacaOrderMutationError,
		CreateAlpacaOrderMutationParams
	>((params: CreateAlpacaOrderMutationParams) => createAlpacaOrder(params), {
		onError: (error: CreateAlpacaOrderMutationError) => {
			console.error('Create operation failed:', error);
		},
		onSuccess: (data: CreateAlpacaOrderMutationData) => {
			console.log('Create operation successful', data);
		},
		...options,
	});
};
