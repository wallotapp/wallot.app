import { useMutation } from '@tanstack/react-query';
import { createInvoice } from '@wallot/react/src/features/invoices/api/createInvoice';
import { CreateInvoiceMutationData, CreateInvoiceMutationError, CreateInvoiceMutationParams, UseCreateInvoiceMutationOptions } from '@wallot/react/src/features/invoices/types/InvoiceReactTypes';

export const useCreateInvoiceMutation = (options?: UseCreateInvoiceMutationOptions) => {
	return useMutation<CreateInvoiceMutationData, CreateInvoiceMutationError, CreateInvoiceMutationParams>((params: CreateInvoiceMutationParams) => createInvoice(params), {
		onError: (error: CreateInvoiceMutationError) => {
			console.error('Create operation failed:', error);
		},
		onSuccess: (data: CreateInvoiceMutationData) => {
			console.log('Create operation successful', data);
		},
		...(options ?? {}),
	});
};
