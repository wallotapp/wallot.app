import { useMutation } from '@tanstack/react-query';
import { createAlpacaAsset } from '@wallot/react/src/features/alpacaAssets/api/createAlpacaAsset';
import {
	CreateAlpacaAssetMutationData,
	CreateAlpacaAssetMutationError,
	CreateAlpacaAssetMutationParams,
	UseCreateAlpacaAssetMutationOptions,
} from '@wallot/react/src/features/alpacaAssets/types/AlpacaAssetReactTypes';

export const useCreateAlpacaAssetMutation = (
	options?: UseCreateAlpacaAssetMutationOptions,
) => {
	return useMutation<
		CreateAlpacaAssetMutationData,
		CreateAlpacaAssetMutationError,
		CreateAlpacaAssetMutationParams
	>((params: CreateAlpacaAssetMutationParams) => createAlpacaAsset(params), {
		onError: (error: CreateAlpacaAssetMutationError) => {
			console.error('Create operation failed:', error);
		},
		onSuccess: (data: CreateAlpacaAssetMutationData) => {
			console.log('Create operation successful', data);
		},
		...(options ?? {}),
	});
};
