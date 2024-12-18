import { useMutation } from '@tanstack/react-query';
import { createEquityAccount } from '@wallot/react/src/features/equityAccounts/api/createEquityAccount';
import {
	CreateEquityAccountMutationData,
	CreateEquityAccountMutationError,
	CreateEquityAccountMutationParams,
	UseCreateEquityAccountMutationOptions,
} from '@wallot/react/src/features/equityAccounts/types/EquityAccountReactTypes';

export const useCreateEquityAccountMutation = (
	options?: UseCreateEquityAccountMutationOptions,
) => {
	return useMutation<
		CreateEquityAccountMutationData,
		CreateEquityAccountMutationError,
		CreateEquityAccountMutationParams
	>(
		(params: CreateEquityAccountMutationParams) => createEquityAccount(params),
		{
			onError: (error: CreateEquityAccountMutationError) => {
				console.error('Create operation failed:', error);
			},
			onSuccess: (data: CreateEquityAccountMutationData) => {
				console.log('Create operation successful', data);
			},
			...(options ?? {}),
		},
	);
};
