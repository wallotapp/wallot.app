import { useMutation } from '@tanstack/react-query';
import { updateStripeSubscription } from '@wallot/react/src/features/stripeSubscriptions/api/updateStripeSubscription';
import {
	UpdateStripeSubscriptionMutationData,
	UpdateStripeSubscriptionMutationError,
	UpdateStripeSubscriptionMutationParams,
	UseUpdateStripeSubscriptionMutationOptions,
} from '@wallot/react/src/features/stripeSubscriptions/types/StripeSubscriptionReactTypes';

export const useUpdateStripeSubscriptionMutation = (
	options?: UseUpdateStripeSubscriptionMutationOptions,
) => {
	return useMutation<
		UpdateStripeSubscriptionMutationData,
		UpdateStripeSubscriptionMutationError,
		UpdateStripeSubscriptionMutationParams
	>(
		(params: UpdateStripeSubscriptionMutationParams) =>
			updateStripeSubscription(params),
		{
			onError: (error: UpdateStripeSubscriptionMutationError) => {
				console.error('Update operation failed:', error);
			},
			onSuccess: (data: UpdateStripeSubscriptionMutationData) => {
				console.log('Update operation successful', data);
			},
			...(options ?? {}),
		},
	);
};
