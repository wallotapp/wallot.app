import { useMutation } from '@tanstack/react-query';
import { createStripeSubscription } from '@wallot/react/src/features/stripeSubscriptions/api/createStripeSubscription';
import {
	CreateStripeSubscriptionMutationData,
	CreateStripeSubscriptionMutationError,
	CreateStripeSubscriptionMutationParams,
	UseCreateStripeSubscriptionMutationOptions,
} from '@wallot/react/src/features/stripeSubscriptions/types/StripeSubscriptionReactTypes';

export const useCreateStripeSubscriptionMutation = (
	options?: UseCreateStripeSubscriptionMutationOptions,
) => {
	return useMutation<
		CreateStripeSubscriptionMutationData,
		CreateStripeSubscriptionMutationError,
		CreateStripeSubscriptionMutationParams
	>(
		(params: CreateStripeSubscriptionMutationParams) =>
			createStripeSubscription(params),
		{
			onError: (error: CreateStripeSubscriptionMutationError) => {
				console.error('Create operation failed:', error);
			},
			onSuccess: (data: CreateStripeSubscriptionMutationData) => {
				console.log('Create operation successful', data);
			},
			...(options ?? {}),
		},
	);
};
