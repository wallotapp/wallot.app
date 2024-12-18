import { useMutation } from '@tanstack/react-query';
import { updateStripeFinancialConnectionSession } from '@wallot/react/src/features/stripeFinancialConnectionSessions/api/updateStripeFinancialConnectionSession';
import {
	UpdateStripeFinancialConnectionSessionMutationData,
	UpdateStripeFinancialConnectionSessionMutationError,
	UpdateStripeFinancialConnectionSessionMutationParams,
	UseUpdateStripeFinancialConnectionSessionMutationOptions,
} from '@wallot/react/src/features/stripeFinancialConnectionSessions/types/StripeFinancialConnectionSessionReactTypes';

export const useUpdateStripeFinancialConnectionSessionMutation = (
	options?: UseUpdateStripeFinancialConnectionSessionMutationOptions,
) => {
	return useMutation<
		UpdateStripeFinancialConnectionSessionMutationData,
		UpdateStripeFinancialConnectionSessionMutationError,
		UpdateStripeFinancialConnectionSessionMutationParams
	>(
		(params: UpdateStripeFinancialConnectionSessionMutationParams) =>
			updateStripeFinancialConnectionSession(params),
		{
			onError: (error: UpdateStripeFinancialConnectionSessionMutationError) => {
				console.error('Update operation failed:', error);
			},
			onSuccess: (data: UpdateStripeFinancialConnectionSessionMutationData) => {
				console.log('Update operation successful', data);
			},
			...(options ?? {}),
		},
	);
};
