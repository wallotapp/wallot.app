import { useMutation } from '@tanstack/react-query';
import { updateAssetPrice } from '@wallot/react/src/features/assetPrices/api/updateAssetPrice';
import { UpdateAssetPriceMutationData, UpdateAssetPriceMutationError, UpdateAssetPriceMutationParams, UseUpdateAssetPriceMutationOptions } from '@wallot/react/src/features/assetPrices/types/AssetPriceReactTypes';

export const useUpdateAssetPriceMutation = (options?: UseUpdateAssetPriceMutationOptions) => {
	return useMutation<UpdateAssetPriceMutationData, UpdateAssetPriceMutationError, UpdateAssetPriceMutationParams>((params: UpdateAssetPriceMutationParams) => updateAssetPrice(params), {
		onError: (error: UpdateAssetPriceMutationError) => {
			console.error('Update operation failed:', error);
		},
		onSuccess: (data: UpdateAssetPriceMutationData) => {
			console.log('Update operation successful', data);
		},
		...(options ?? {}),
	});
};
