import { useMutation } from '@tanstack/react-query';
import { createFundingAccount } from '@wallot/react/src/features/fundingAccounts/api/createFundingAccount';
import {
	CreateFundingAccountMutationData,
	CreateFundingAccountMutationError,
	CreateFundingAccountMutationParams,
	UseCreateFundingAccountMutationOptions,
} from '@wallot/react/src/features/fundingAccounts/types/FundingAccountReactTypes';

export const useCreateFundingAccountMutation = (
	options?: UseCreateFundingAccountMutationOptions,
) => {
	return useMutation<
		CreateFundingAccountMutationData,
		CreateFundingAccountMutationError,
		CreateFundingAccountMutationParams
	>(
		(params: CreateFundingAccountMutationParams) =>
			createFundingAccount(params),
		{
			onError: (error: CreateFundingAccountMutationError) => {
				console.error('Create operation failed:', error);
			},
			onSuccess: (data: CreateFundingAccountMutationData) => {
				console.log('Create operation successful', data);
			},
			...options,
		},
	);
};
