import { useContext } from 'react';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AuthContext } from 'ergonomic-react/src/features/authentication/providers/AuthProvider';
import { TokenizeBankAccountParams, TokenizeBankAccountResponse } from '@wallot/js';
import { tokenizeBankAccount } from '@wallot/react/src/features/bankAccounts/api/tokenizeBankAccount';
import { GeneralizedError } from 'ergonomic';

export const useTokenizeBankAccountMutation = (bankAccountId: string, options?: UseMutationOptions<TokenizeBankAccountResponse, GeneralizedError, TokenizeBankAccountParams>) => {
	const { user: firebaseUser } = useContext(AuthContext);
	return useMutation<TokenizeBankAccountResponse, GeneralizedError, TokenizeBankAccountParams>((params) => tokenizeBankAccount(firebaseUser, bankAccountId, params), {
		onError: (error: GeneralizedError) => {
			console.error('tokenizeBankAccount operation failed:', error);
		},
		onSuccess: (data: TokenizeBankAccountResponse) => {
			console.log('tokenizeBankAccount operation successful', data);
		},
		...options,
	});
};
