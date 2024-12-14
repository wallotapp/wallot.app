import { useContext } from 'react';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AuthContext } from 'ergonomic-react/src/features/authentication/providers/AuthProvider';
import {
	CreateStripeFinancialConnectionSessionParams,
	StripeFinancialConnectionSession,
} from '@wallot/js';
import { createStripeFinancialConnectionSession } from '@wallot/react/src/features/fundingAccounts/api/createStripeFinancialConnectionSession';
import { GeneralizedResponse } from 'ergonomic';

export const useCreateStripeFinancialConnectionSessionMutation = (
	options?: UseMutationOptions<
		StripeFinancialConnectionSession,
		GeneralizedResponse,
		CreateStripeFinancialConnectionSessionParams
	>,
) => {
	const { user: firebaseUser } = useContext(AuthContext);
	return useMutation<
		StripeFinancialConnectionSession,
		GeneralizedResponse,
		CreateStripeFinancialConnectionSessionParams
	>(
		(params: CreateStripeFinancialConnectionSessionParams) =>
			createStripeFinancialConnectionSession(firebaseUser, params),
		{
			onError: (error: GeneralizedResponse) => {
				console.error(
					'CreateStripeFinancialConnectionSession operation failed:',
					error,
				);
			},
			onSuccess: (data: StripeFinancialConnectionSession) => {
				console.log(
					'CreateStripeFinancialConnectionSession operation successful',
					data,
				);
			},
			...options,
		},
	);
};
