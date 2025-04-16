import { useContext } from 'react';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AuthContext } from 'ergonomic-react/src/features/authentication/providers/AuthProvider';
import { ConfirmOrderParams, ConfirmOrderResponse } from '@wallot/js';
import { confirmOrder } from '@wallot/react/src/features/orders/api/confirmOrder';
import { GeneralizedError } from 'ergonomic';

export function useConfirmOrderMutation(
	orderId: string | null | undefined,
	options?: UseMutationOptions<
		ConfirmOrderResponse,
		GeneralizedError,
		ConfirmOrderParams
	>,
) {
	const { user: firebaseUser } = useContext(AuthContext);
	return useMutation<
		ConfirmOrderResponse,
		GeneralizedError,
		ConfirmOrderParams
	>((params) => confirmOrder(firebaseUser, orderId, params), {
		onError: (error: GeneralizedError) => {
			console.error('confirmOrder operation failed:', error);
		},
		onSuccess: (data: ConfirmOrderResponse) => {
			console.log('confirmOrder operation successful', data);
		},
		...(options ?? {}),
	});
}
