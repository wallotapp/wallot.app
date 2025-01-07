import { useMutation } from '@tanstack/react-query';
import { createAssetOrder } from '@wallot/react/src/features/assetOrders/api/createAssetOrder';
import {
	CreateAssetOrderMutationData,
	CreateAssetOrderMutationError,
	CreateAssetOrderMutationParams,
	UseCreateAssetOrderMutationOptions,
} from '@wallot/react/src/features/assetOrders/types/AssetOrderReactTypes';

export function useCreateAssetOrderMutation(
	options?: UseCreateAssetOrderMutationOptions,
) {
	return useMutation<
		CreateAssetOrderMutationData,
		CreateAssetOrderMutationError,
		CreateAssetOrderMutationParams
	>((params: CreateAssetOrderMutationParams) => createAssetOrder(params), {
		onError: (error: CreateAssetOrderMutationError) => {
			console.error('Create operation failed:', error);
		},
		onSuccess: (data: CreateAssetOrderMutationData) => {
			console.log('Create operation successful', data);
		},
		...(options ?? {}),
	});
}
