import { useMutation } from '@tanstack/react-query';
import { createStripeInvoice } from '@wallot/react/src/features/stripeInvoices/api/createStripeInvoice';
import {
	CreateStripeInvoiceMutationData,
	CreateStripeInvoiceMutationError,
	CreateStripeInvoiceMutationParams,
	UseCreateStripeInvoiceMutationOptions,
} from '@wallot/react/src/features/stripeInvoices/types/StripeInvoiceReactTypes';

export const useCreateStripeInvoiceMutation = (
	options?: UseCreateStripeInvoiceMutationOptions,
) => {
	return useMutation<
		CreateStripeInvoiceMutationData,
		CreateStripeInvoiceMutationError,
		CreateStripeInvoiceMutationParams
	>(
		(params: CreateStripeInvoiceMutationParams) => createStripeInvoice(params),
		{
			onError: (error: CreateStripeInvoiceMutationError) => {
				console.error('Create operation failed:', error);
			},
			onSuccess: (data: CreateStripeInvoiceMutationData) => {
				console.log('Create operation successful', data);
			},
			...(options ?? {}),
		},
	);
};
