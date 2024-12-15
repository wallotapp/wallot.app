import { useMutation } from '@tanstack/react-query';
import { updateAlphaVantageCompany } from '@wallot/react/src/features/alphaVantageCompanies/api/updateAlphaVantageCompany';
import {
	UpdateAlphaVantageCompanyMutationData,
	UpdateAlphaVantageCompanyMutationError,
	UpdateAlphaVantageCompanyMutationParams,
	UseUpdateAlphaVantageCompanyMutationOptions,
} from '@wallot/react/src/features/alphaVantageCompanies/types/AlphaVantageCompanyReactTypes';

export const useUpdateAlphaVantageCompanyMutation = (
	options?: UseUpdateAlphaVantageCompanyMutationOptions,
) => {
	return useMutation<
		UpdateAlphaVantageCompanyMutationData,
		UpdateAlphaVantageCompanyMutationError,
		UpdateAlphaVantageCompanyMutationParams
	>(
		(params: UpdateAlphaVantageCompanyMutationParams) =>
			updateAlphaVantageCompany(params),
		{
			onError: (error: UpdateAlphaVantageCompanyMutationError) => {
				console.error('Update operation failed:', error);
			},
			onSuccess: (data: UpdateAlphaVantageCompanyMutationData) => {
				console.log('Update operation successful', data);
			},
			...options,
		},
	);
};
