import { useMutation } from '@tanstack/react-query';
import { createAsset } from '@wallot/react/src/features/assets/api/createAsset';
import {
	CreateAssetMutationData,
	CreateAssetMutationError,
	CreateAssetMutationParams,
	UseCreateAssetMutationOptions,
} from '@wallot/react/src/features/assets/types/AssetReactTypes';

export const useCreateAssetMutation = (
	options?: UseCreateAssetMutationOptions,
) => {
	return useMutation<
		CreateAssetMutationData,
		CreateAssetMutationError,
		CreateAssetMutationParams
	>((params: CreateAssetMutationParams) => createAsset(params), {
		onError: (error: CreateAssetMutationError) => {
			console.error('Create operation failed:', error);
		},
		onSuccess: (data: CreateAssetMutationData) => {
			console.log('Create operation successful', data);
		},
		...options,
	});
};
