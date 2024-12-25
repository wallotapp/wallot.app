import { useMutation } from '@tanstack/react-query';
import { updateBankAccount } from '@wallot/react/src/features/bankAccounts/api/updateBankAccount';
import { UpdateBankAccountMutationData, UpdateBankAccountMutationError, UpdateBankAccountMutationParams, UseUpdateBankAccountMutationOptions } from '@wallot/react/src/features/bankAccounts/types/BankAccountReactTypes';

export const useUpdateBankAccountMutation = (options?: UseUpdateBankAccountMutationOptions) => {
	return useMutation<UpdateBankAccountMutationData, UpdateBankAccountMutationError, UpdateBankAccountMutationParams>((params: UpdateBankAccountMutationParams) => updateBankAccount(params), {
		onError: (error: UpdateBankAccountMutationError) => {
			console.error('Update operation failed:', error);
		},
		onSuccess: (data: UpdateBankAccountMutationData) => {
			console.log('Update operation successful', data);
		},
		...(options ?? {}),
	});
};
