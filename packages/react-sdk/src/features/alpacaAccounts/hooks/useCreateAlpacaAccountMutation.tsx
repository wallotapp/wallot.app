import { useMutation } from '@tanstack/react-query';
import { createAlpacaAccount } from '@wallot/react/src/features/alpacaAccounts/api/createAlpacaAccount';
import {
	CreateAlpacaAccountMutationData,
	CreateAlpacaAccountMutationError,
	CreateAlpacaAccountMutationParams,
	UseCreateAlpacaAccountMutationOptions,
} from '@wallot/react/src/features/alpacaAccounts/types/AlpacaAccountReactTypes';

export const useCreateAlpacaAccountMutation = (
	options?: UseCreateAlpacaAccountMutationOptions,
) => {
	return useMutation<
		CreateAlpacaAccountMutationData,
		CreateAlpacaAccountMutationError,
		CreateAlpacaAccountMutationParams
	>(
		(params: CreateAlpacaAccountMutationParams) => createAlpacaAccount(params),
		{
			onError: (error: CreateAlpacaAccountMutationError) => {
				console.error('Create operation failed:', error);
			},
			onSuccess: (data: CreateAlpacaAccountMutationData) => {
				console.log('Create operation successful', data);
			},
			...options,
		},
	);
};
