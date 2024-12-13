import { useMutation } from '@tanstack/react-query';
import { updateFundingAccount } from '@wallot/react/src/features/fundingAccounts/api/updateFundingAccount';
import {
	UpdateFundingAccountMutationData,
	UpdateFundingAccountMutationError,
	UpdateFundingAccountMutationParams,
	UseUpdateFundingAccountMutationOptions,
} from '@wallot/react/src/features/fundingAccounts/types/FundingAccountReactTypes';

export const useUpdateFundingAccountMutation = (
	options?: UseUpdateFundingAccountMutationOptions,
) => {
	return useMutation<
		UpdateFundingAccountMutationData,
		UpdateFundingAccountMutationError,
		UpdateFundingAccountMutationParams
	>(
		(params: UpdateFundingAccountMutationParams) =>
			updateFundingAccount(params),
		{
			onError: (error: UpdateFundingAccountMutationError) => {
				console.error('Update operation failed:', error);
			},
			onSuccess: (data: UpdateFundingAccountMutationData) => {
				console.log('Update operation successful', data);
			},
			...options,
		},
	);
};
