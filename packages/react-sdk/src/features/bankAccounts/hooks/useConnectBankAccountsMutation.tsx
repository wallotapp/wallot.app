import { type FinancialConnectionsSession } from '@stripe/stripe-js';
import { useContext } from 'react';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AuthContext } from 'ergonomic-react/src/features/authentication/providers/AuthProvider';
import {
	ConnectBankAccountsParams,
	ConnectBankAccountsResponse,
} from '@wallot/js';
import { connectBankAccounts } from '@wallot/react/src/features/bankAccounts/api/connectBankAccounts';
import { GeneralizedError } from 'ergonomic';

export const useConnectBankAccountsMutation = (
	options?: UseMutationOptions<
		ConnectBankAccountsResponse,
		GeneralizedError,
		ConnectBankAccountsParams<FinancialConnectionsSession.Account>
	>,
) => {
	const { user: firebaseUser } = useContext(AuthContext);
	return useMutation<
		ConnectBankAccountsResponse,
		GeneralizedError,
		ConnectBankAccountsParams<FinancialConnectionsSession.Account>
	>(
		(params: ConnectBankAccountsParams<FinancialConnectionsSession.Account>) =>
			connectBankAccounts(firebaseUser, params),
		{
			onError: (error: GeneralizedError) => {
				console.error('connectBankAccounts operation failed:', error);
			},
			onSuccess: (data: ConnectBankAccountsResponse) => {
				console.log('connectBankAccounts operation successful', data);
			},
			...options,
		},
	);
};
