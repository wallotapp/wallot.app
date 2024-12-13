import { useMutation } from '@tanstack/react-query';
import { createLicense } from '@wallot/react/src/features/licenses/api/createLicense';
import {
	CreateLicenseMutationData,
	CreateLicenseMutationError,
	CreateLicenseMutationParams,
	UseCreateLicenseMutationOptions,
} from '@wallot/react/src/features/licenses/types/LicenseReactTypes';

export const useCreateLicenseMutation = (
	options?: UseCreateLicenseMutationOptions,
) => {
	return useMutation<
		CreateLicenseMutationData,
		CreateLicenseMutationError,
		CreateLicenseMutationParams
	>((params: CreateLicenseMutationParams) => createLicense(params), {
		onError: (error: CreateLicenseMutationError) => {
			console.error('Create operation failed:', error);
		},
		onSuccess: (data: CreateLicenseMutationData) => {
			console.log('Create operation successful', data);
		},
		...options,
	});
};
