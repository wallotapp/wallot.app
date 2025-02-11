import { useMutation } from '@tanstack/react-query';
import { updateScholarshipApplication } from '@wallot/react/src/features/scholarshipApplications/api/updateScholarshipApplication';
import {
	UpdateScholarshipApplicationMutationData,
	UpdateScholarshipApplicationMutationError,
	UpdateScholarshipApplicationMutationParams,
	UseUpdateScholarshipApplicationMutationOptions,
} from '@wallot/react/src/features/scholarshipApplications/types/ScholarshipApplicationReactTypes';

export function useUpdateScholarshipApplicationMutation(
	options?: UseUpdateScholarshipApplicationMutationOptions,
) {
	return useMutation<
		UpdateScholarshipApplicationMutationData,
		UpdateScholarshipApplicationMutationError,
		UpdateScholarshipApplicationMutationParams
	>(
		(params: UpdateScholarshipApplicationMutationParams) =>
			updateScholarshipApplication(params),
		{
			onError: (error: UpdateScholarshipApplicationMutationError) => {
				console.error('Update operation failed:', error);
			},
			onSuccess: (data: UpdateScholarshipApplicationMutationData) => {
				console.log('Update operation successful', data);
			},
			...options,
		},
	);
};
