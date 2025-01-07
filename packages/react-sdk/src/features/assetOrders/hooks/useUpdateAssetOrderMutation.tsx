import { useMutation } from '@tanstack/react-query';
import { updateAssetOrder } from '@wallot/react/src/features/assetOrders/api/updateAssetOrder';
import {
	UpdateAssetOrderMutationData,
	UpdateAssetOrderMutationError,
	UpdateAssetOrderMutationParams,
	UseUpdateAssetOrderMutationOptions,
} from '@wallot/react/src/features/assetOrders/types/AssetOrderReactTypes';

export function useUpdateAssetOrderMutation(
	options?: UseUpdateAssetOrderMutationOptions,
) {
	return useMutation<
		UpdateAssetOrderMutationData,
		UpdateAssetOrderMutationError,
		UpdateAssetOrderMutationParams
	>((params: UpdateAssetOrderMutationParams) => updateAssetOrder(params), {
		onError: (error: UpdateAssetOrderMutationError) => {
			console.error('Update operation failed:', error);
		},
		onSuccess: (data: UpdateAssetOrderMutationData) => {
			console.log('Update operation successful', data);
		},
		...(options ?? {}),
	});
}
