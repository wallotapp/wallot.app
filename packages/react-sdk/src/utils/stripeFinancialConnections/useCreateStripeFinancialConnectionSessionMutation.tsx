import { useContext } from 'react';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AuthContext } from 'ergonomic-react/src/features/authentication/providers/AuthProvider';
import {
	CreateStripeFinancialConnectionSessionFormData,
	StripeFinancialConnectionSessionResponseData,
} from '@wallot/js';
import { createStripeFinancialConnectionSession } from '@wallot/react/src/utils/stripeFinancialConnections/createStripeFinancialConnectionSession';
import { GeneralizedResponse } from 'ergonomic';

export const useCreateStripeFinancialConnectionSessionMutation = (
	options?: UseMutationOptions<
		StripeFinancialConnectionSessionResponseData,
		GeneralizedResponse,
		CreateStripeFinancialConnectionSessionFormData
	>,
) => {
	const { user: firebaseUser } = useContext(AuthContext);
	return useMutation<
		StripeFinancialConnectionSessionResponseData,
		GeneralizedResponse,
		CreateStripeFinancialConnectionSessionFormData
	>(
		(params: CreateStripeFinancialConnectionSessionFormData) =>
			createStripeFinancialConnectionSession(firebaseUser, params),
		{
			onError: (error: GeneralizedResponse) => {
				console.error(
					'CreateStripeFinancialConnectionSession operation failed:',
					error,
				);
			},
			onSuccess: (data: StripeFinancialConnectionSessionResponseData) => {
				console.log(
					'CreateStripeFinancialConnectionSession operation successful',
					data,
				);
			},
			...options,
		},
	);
};
