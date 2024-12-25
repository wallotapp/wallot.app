import { useContext } from 'react';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AuthContext } from 'ergonomic-react/src/features/authentication/providers/AuthProvider';
import { CreateStripeFinancialConnectionsSessionParams, CreateStripeFinancialConnectionsSessionResponse } from '@wallot/js';
import { createStripeFinancialConnectionSession } from '@wallot/react/src/features/bankAccounts/api/createStripeFinancialConnectionsSession';
import { GeneralizedError } from 'ergonomic';

export const useCreateStripeFinancialConnectionSessionMutation = (options?: UseMutationOptions<CreateStripeFinancialConnectionsSessionResponse, GeneralizedError, CreateStripeFinancialConnectionsSessionParams>) => {
	const { user: firebaseUser } = useContext(AuthContext);
	return useMutation<CreateStripeFinancialConnectionsSessionResponse, GeneralizedError, CreateStripeFinancialConnectionsSessionParams>(
		(params: CreateStripeFinancialConnectionsSessionParams) => createStripeFinancialConnectionSession(firebaseUser, params),
		{
			onError: (error: GeneralizedError) => {
				console.error('createStripeFinancialConnectionSession operation failed:', error);
			},
			onSuccess: (data: CreateStripeFinancialConnectionsSessionResponse) => {
				console.log('createStripeFinancialConnectionSession operation successful', data);
			},
			...options,
		},
	);
};
