import { useMutation } from '@tanstack/react-query';
import { createAlphaVantageCompany } from '@wallot/react/src/features/alphaVantageCompanies/api/createAlphaVantageCompany';
import {
	CreateAlphaVantageCompanyMutationData,
	CreateAlphaVantageCompanyMutationError,
	CreateAlphaVantageCompanyMutationParams,
	UseCreateAlphaVantageCompanyMutationOptions,
} from '@wallot/react/src/features/alphaVantageCompanies/types/AlphaVantageCompanyReactTypes';

export const useCreateAlphaVantageCompanyMutation = (
	options?: UseCreateAlphaVantageCompanyMutationOptions,
) => {
	return useMutation<
		CreateAlphaVantageCompanyMutationData,
		CreateAlphaVantageCompanyMutationError,
		CreateAlphaVantageCompanyMutationParams
	>(
		(params: CreateAlphaVantageCompanyMutationParams) =>
			createAlphaVantageCompany(params),
		{
			onError: (error: CreateAlphaVantageCompanyMutationError) => {
				console.error('Create operation failed:', error);
			},
			onSuccess: (data: CreateAlphaVantageCompanyMutationData) => {
				console.log('Create operation successful', data);
			},
			...(options ?? {}),
		},
	);
};
