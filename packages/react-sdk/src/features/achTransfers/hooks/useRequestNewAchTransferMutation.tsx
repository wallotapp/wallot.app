import { useContext } from 'react';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AuthContext } from 'ergonomic-react/src/features/authentication/providers/AuthProvider';
import {
	RequestNewAchTransferParams,
	RequestNewAchTransferResponse,
} from '@wallot/js';
import { requestNewAchTransfer } from '@wallot/react/src/features/achTransfers/api/requestNewAchTransfer';
import { GeneralizedError } from 'ergonomic';

export function useRequestNewAchTransferMutation(
	options?: UseMutationOptions<
		RequestNewAchTransferResponse,
		GeneralizedError,
		RequestNewAchTransferParams
	>,
) {
	const { user: firebaseUser } = useContext(AuthContext);
	return useMutation<
		RequestNewAchTransferResponse,
		GeneralizedError,
		RequestNewAchTransferParams
	>((params) => requestNewAchTransfer(firebaseUser, params), {
		onError: (error: GeneralizedError) => {
			console.error('requestNewAchTransfer operation failed:', error);
		},
		onSuccess: (data: RequestNewAchTransferResponse) => {
			console.log('requestNewAchTransfer operation successful', data);
		},
		...(options ?? {}),
	});
}
