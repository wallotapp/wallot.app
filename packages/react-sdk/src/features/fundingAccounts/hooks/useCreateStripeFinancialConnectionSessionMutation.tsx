import { useContext } from 'react';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AuthContext } from 'ergonomic-react/src/features/authentication/providers/AuthProvider';
import { createStripeFinancialConnectionSession } from '@wallot/react/src/features/fundingAccounts/api/createStripeFinancialConnectionSession';
import { GeneralizedResponse } from 'ergonomic';

export const useCreateStripeFinancialConnectionSessionMutation = (
	options?: UseMutationOptions<
		GeneralizedResponse<unknown>,
		GeneralizedResponse,
		unknown
	>,
) => {
	const { user: firebaseUser } = useContext(AuthContext);
	return useMutation<
		GeneralizedResponse<unknown>,
		GeneralizedResponse,
		unknown
	>(
		(params: unknown) =>
			createStripeFinancialConnectionSession(firebaseUser, params),
		{
			onError: (error: GeneralizedResponse) => {
				console.error(
					'CreateStripeFinancialConnectionSession operation failed:',
					error,
				);
			},
			onSuccess: (data: GeneralizedResponse<unknown>) => {
				console.log(
					'CreateStripeFinancialConnectionSession operation successful',
					data,
				);
			},
			...options,
		},
	);
};
