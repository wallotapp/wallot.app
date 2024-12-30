import { useContext } from 'react';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AuthContext } from 'ergonomic-react/src/features/authentication/providers/AuthProvider';
import {
	RequestNewTransferParams,
	RequestNewTransferResponse,
} from '@wallot/js';
import { requestNewTransfer } from '@wallot/react/src/features/achTransfers/api/requestNewTransfer';
import { GeneralizedError } from 'ergonomic';

export function useRequestNewTransferMutation(
	options?: UseMutationOptions<
		RequestNewTransferResponse,
		GeneralizedError,
		RequestNewTransferParams
	>,
) {
	const { user: firebaseUser } = useContext(AuthContext);
	return useMutation<
		RequestNewTransferResponse,
		GeneralizedError,
		RequestNewTransferParams
	>((params) => requestNewTransfer(firebaseUser, params), {
		onError: (error: GeneralizedError) => {
			console.error('requestNewTransfer operation failed:', error);
		},
		onSuccess: (data: RequestNewTransferResponse) => {
			console.log('requestNewTransfer operation successful', data);
		},
		...options,
	});
}
