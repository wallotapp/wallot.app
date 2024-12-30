import { useMutation } from '@tanstack/react-query';
import { createAssetPrice } from '@wallot/react/src/features/assetPrices/api/createAssetPrice';
import {
	CreateAssetPriceMutationData,
	CreateAssetPriceMutationError,
	CreateAssetPriceMutationParams,
	UseCreateAssetPriceMutationOptions,
} from '@wallot/react/src/features/assetPrices/types/AssetPriceReactTypes';

export function useCreateAssetPriceMutation(
	options?: UseCreateAssetPriceMutationOptions,
) {
	return useMutation<
		CreateAssetPriceMutationData,
		CreateAssetPriceMutationError,
		CreateAssetPriceMutationParams
	>((params: CreateAssetPriceMutationParams) => createAssetPrice(params), {
		onError: (error: CreateAssetPriceMutationError) => {
			console.error('Create operation failed:', error);
		},
		onSuccess: (data: CreateAssetPriceMutationData) => {
			console.log('Create operation successful', data);
		},
		...(options ?? {}),
	});
}
