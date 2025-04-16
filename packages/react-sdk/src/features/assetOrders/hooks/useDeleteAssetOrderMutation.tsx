import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { deleteAssetOrder } from '@wallot/react/src/features/assetOrders/api/deleteAssetOrder';
import { GeneralizedError } from 'ergonomic';

export function useDeleteAssetOrderMutation(
	assetOrderId: string,
	options?: UseMutationOptions<
		Record<string, never>,
		GeneralizedError,
		Record<string, never>
	>,
) {
	return useMutation<
		Record<string, never>,
		GeneralizedError,
		Record<string, never>
	>(() => deleteAssetOrder(assetOrderId), {
		onError: (error: GeneralizedError) => {
			console.error('deleteAssetOrder operation failed:', error);
		},
		onSuccess: () => {
			console.log('deleteAssetOrder operation successful');
		},
		...(options ?? {}),
	});
}
