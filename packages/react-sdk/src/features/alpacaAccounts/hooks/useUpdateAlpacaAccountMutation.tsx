import { useMutation } from '@tanstack/react-query';
import { updateAlpacaAccount } from '@wallot/react/src/features/alpacaAccounts/api/updateAlpacaAccount';
import {
	UpdateAlpacaAccountMutationData,
	UpdateAlpacaAccountMutationError,
	UpdateAlpacaAccountMutationParams,
	UseUpdateAlpacaAccountMutationOptions,
} from '@wallot/react/src/features/alpacaAccounts/types/AlpacaAccountReactTypes';

export const useUpdateAlpacaAccountMutation = (
	options?: UseUpdateAlpacaAccountMutationOptions,
) => {
	return useMutation<
		UpdateAlpacaAccountMutationData,
		UpdateAlpacaAccountMutationError,
		UpdateAlpacaAccountMutationParams
	>(
		(params: UpdateAlpacaAccountMutationParams) => updateAlpacaAccount(params),
		{
			onError: (error: UpdateAlpacaAccountMutationError) => {
				console.error('Update operation failed:', error);
			},
			onSuccess: (data: UpdateAlpacaAccountMutationData) => {
				console.log('Update operation successful', data);
			},
			...options,
		},
	);
};
