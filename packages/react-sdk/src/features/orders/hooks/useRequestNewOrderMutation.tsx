import { useContext } from 'react';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AuthContext } from 'ergonomic-react/src/features/authentication/providers/AuthProvider';
import { RequestNewOrderParams, RequestNewOrderResponse } from '@wallot/js';
import { requestNewOrder } from '@wallot/react/src/features/orders/api/requestNewOrder';
import { GeneralizedError } from 'ergonomic';

export function useRequestNewOrderMutation(
	options?: UseMutationOptions<
		RequestNewOrderResponse,
		GeneralizedError,
		RequestNewOrderParams
	>,
) {
	const { user: firebaseUser } = useContext(AuthContext);
	return useMutation<
		RequestNewOrderResponse,
		GeneralizedError,
		RequestNewOrderParams
	>((params) => requestNewOrder(firebaseUser, params), {
		onError: (error: GeneralizedError) => {
			console.error('requestNewOrder operation failed:', error);
		},
		onSuccess: (data: RequestNewOrderResponse) => {
			console.log('requestNewOrder operation successful', data);
		},
		...(options ?? {}),
	});
}
