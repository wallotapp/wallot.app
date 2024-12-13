import { useMutation } from '@tanstack/react-query';
import { updateLicense } from '@wallot/react/src/features/licenses/api/updateLicense';
import {
	UpdateLicenseMutationData,
	UpdateLicenseMutationError,
	UpdateLicenseMutationParams,
	UseUpdateLicenseMutationOptions,
} from '@wallot/react/src/features/licenses/types/LicenseReactTypes';

export const useUpdateLicenseMutation = (
	options?: UseUpdateLicenseMutationOptions,
) => {
	return useMutation<
		UpdateLicenseMutationData,
		UpdateLicenseMutationError,
		UpdateLicenseMutationParams
	>(
		(params: UpdateLicenseMutationParams) =>
			updateLicense(params),
		{
			onError: (error: UpdateLicenseMutationError) => {
				console.error('Update operation failed:', error);
			},
			onSuccess: (data: UpdateLicenseMutationData) => {
				console.log('Update operation successful', data);
			},
			...options,
		},
	);
};
