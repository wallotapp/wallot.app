import { useMutation } from '@tanstack/react-query';
import { updateAsset } from '@wallot/react/src/features/assets/api/updateAsset';
import {
	UpdateAssetMutationData,
	UpdateAssetMutationError,
	UpdateAssetMutationParams,
	UseUpdateAssetMutationOptions,
} from '@wallot/react/src/features/assets/types/AssetReactTypes';

export const useUpdateAssetMutation = (
	options?: UseUpdateAssetMutationOptions,
) => {
	return useMutation<
		UpdateAssetMutationData,
		UpdateAssetMutationError,
		UpdateAssetMutationParams
	>((params: UpdateAssetMutationParams) => updateAsset(params), {
		onError: (error: UpdateAssetMutationError) => {
			console.error('Update operation failed:', error);
		},
		onSuccess: (data: UpdateAssetMutationData) => {
			console.log('Update operation successful', data);
		},
		...(options ?? {}),
	});
};
