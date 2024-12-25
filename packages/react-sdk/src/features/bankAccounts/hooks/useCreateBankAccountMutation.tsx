import { useMutation } from '@tanstack/react-query';
import { createBankAccount } from '@wallot/react/src/features/bankAccounts/api/createBankAccount';
import { CreateBankAccountMutationData, CreateBankAccountMutationError, CreateBankAccountMutationParams, UseCreateBankAccountMutationOptions } from '@wallot/react/src/features/bankAccounts/types/BankAccountReactTypes';

export const useCreateBankAccountMutation = (options?: UseCreateBankAccountMutationOptions) => {
	return useMutation<CreateBankAccountMutationData, CreateBankAccountMutationError, CreateBankAccountMutationParams>((params: CreateBankAccountMutationParams) => createBankAccount(params), {
		onError: (error: CreateBankAccountMutationError) => {
			console.error('Create operation failed:', error);
		},
		onSuccess: (data: CreateBankAccountMutationData) => {
			console.log('Create operation successful', data);
		},
		...(options ?? {}),
	});
};
