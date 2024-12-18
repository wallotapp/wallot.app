import { useMutation } from '@tanstack/react-query';
import { updateEquityAccount } from '@wallot/react/src/features/equityAccounts/api/updateEquityAccount';
import {
	UpdateEquityAccountMutationData,
	UpdateEquityAccountMutationError,
	UpdateEquityAccountMutationParams,
	UseUpdateEquityAccountMutationOptions,
} from '@wallot/react/src/features/equityAccounts/types/EquityAccountReactTypes';

export const useUpdateEquityAccountMutation = (
	options?: UseUpdateEquityAccountMutationOptions,
) => {
	return useMutation<
		UpdateEquityAccountMutationData,
		UpdateEquityAccountMutationError,
		UpdateEquityAccountMutationParams
	>(
		(params: UpdateEquityAccountMutationParams) => updateEquityAccount(params),
		{
			onError: (error: UpdateEquityAccountMutationError) => {
				console.error('Update operation failed:', error);
			},
			onSuccess: (data: UpdateEquityAccountMutationData) => {
				console.log('Update operation successful', data);
			},
			...(options ?? {}),
		},
	);
};
