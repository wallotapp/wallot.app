import { useMutation } from '@tanstack/react-query';
import { updateStripeInvoice } from '@wallot/react/src/features/stripeInvoices/api/updateStripeInvoice';
import {
	UpdateStripeInvoiceMutationData,
	UpdateStripeInvoiceMutationError,
	UpdateStripeInvoiceMutationParams,
	UseUpdateStripeInvoiceMutationOptions,
} from '@wallot/react/src/features/stripeInvoices/types/StripeInvoiceReactTypes';

export const useUpdateStripeInvoiceMutation = (
	options?: UseUpdateStripeInvoiceMutationOptions,
) => {
	return useMutation<
		UpdateStripeInvoiceMutationData,
		UpdateStripeInvoiceMutationError,
		UpdateStripeInvoiceMutationParams
	>(
		(params: UpdateStripeInvoiceMutationParams) => updateStripeInvoice(params),
		{
			onError: (error: UpdateStripeInvoiceMutationError) => {
				console.error('Update operation failed:', error);
			},
			onSuccess: (data: UpdateStripeInvoiceMutationData) => {
				console.log('Update operation successful', data);
			},
			...(options ?? {}),
		},
	);
};
