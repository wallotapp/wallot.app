import { useMutation } from '@tanstack/react-query';
import { updateAlpacaAsset } from '@wallot/react/src/features/alpacaAssets/api/updateAlpacaAsset';
import {
	UpdateAlpacaAssetMutationData,
	UpdateAlpacaAssetMutationError,
	UpdateAlpacaAssetMutationParams,
	UseUpdateAlpacaAssetMutationOptions,
} from '@wallot/react/src/features/alpacaAssets/types/AlpacaAssetReactTypes';

export const useUpdateAlpacaAssetMutation = (
	options?: UseUpdateAlpacaAssetMutationOptions,
) => {
	return useMutation<
		UpdateAlpacaAssetMutationData,
		UpdateAlpacaAssetMutationError,
		UpdateAlpacaAssetMutationParams
	>((params: UpdateAlpacaAssetMutationParams) => updateAlpacaAsset(params), {
		onError: (error: UpdateAlpacaAssetMutationError) => {
			console.error('Update operation failed:', error);
		},
		onSuccess: (data: UpdateAlpacaAssetMutationData) => {
			console.log('Update operation successful', data);
		},
		...options,
	});
};
