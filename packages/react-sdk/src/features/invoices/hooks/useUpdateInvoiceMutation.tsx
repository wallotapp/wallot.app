import { useMutation } from '@tanstack/react-query';
import { updateInvoice } from '@wallot/react/src/features/invoices/api/updateInvoice';
import {
	UpdateInvoiceMutationData,
	UpdateInvoiceMutationError,
	UpdateInvoiceMutationParams,
	UseUpdateInvoiceMutationOptions,
} from '@wallot/react/src/features/invoices/types/InvoiceReactTypes';

export const useUpdateInvoiceMutation = (
	options?: UseUpdateInvoiceMutationOptions,
) => {
	return useMutation<
		UpdateInvoiceMutationData,
		UpdateInvoiceMutationError,
		UpdateInvoiceMutationParams
	>(
		(params: UpdateInvoiceMutationParams) =>
			updateInvoice(params),
		{
			onError: (error: UpdateInvoiceMutationError) => {
				console.error('Update operation failed:', error);
			},
			onSuccess: (data: UpdateInvoiceMutationData) => {
				console.log('Update operation successful', data);
			},
			...options,
		},
	);
};
