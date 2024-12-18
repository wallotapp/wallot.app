import { useMutation } from '@tanstack/react-query';
import { createStripeFinancialConnectionSession } from '@wallot/react/src/features/stripeFinancialConnectionSessions/api/createStripeFinancialConnectionSession';
import {
	CreateStripeFinancialConnectionSessionMutationData,
	CreateStripeFinancialConnectionSessionMutationError,
	CreateStripeFinancialConnectionSessionMutationParams,
	UseCreateStripeFinancialConnectionSessionMutationOptions,
} from '@wallot/react/src/features/stripeFinancialConnectionSessions/types/StripeFinancialConnectionSessionReactTypes';

export const useCreateStripeFinancialConnectionSessionMutation = (
	options?: UseCreateStripeFinancialConnectionSessionMutationOptions,
) => {
	return useMutation<
		CreateStripeFinancialConnectionSessionMutationData,
		CreateStripeFinancialConnectionSessionMutationError,
		CreateStripeFinancialConnectionSessionMutationParams
	>(
		(params: CreateStripeFinancialConnectionSessionMutationParams) =>
			createStripeFinancialConnectionSession(params),
		{
			onError: (error: CreateStripeFinancialConnectionSessionMutationError) => {
				console.error('Create operation failed:', error);
			},
			onSuccess: (data: CreateStripeFinancialConnectionSessionMutationData) => {
				console.log('Create operation successful', data);
			},
			...(options ?? {}),
		},
	);
};
