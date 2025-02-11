import { useMutation } from '@tanstack/react-query';
import { createScholarshipApplication } from '@wallot/react/src/features/scholarshipApplications/api/createScholarshipApplication';
import {
	CreateScholarshipApplicationMutationData,
	CreateScholarshipApplicationMutationError,
	CreateScholarshipApplicationMutationParams,
	UseCreateScholarshipApplicationMutationOptions,
} from '@wallot/react/src/features/scholarshipApplications/types/ScholarshipApplicationReactTypes';

export function useCreateScholarshipApplicationMutation(
	options?: UseCreateScholarshipApplicationMutationOptions,
) {
	return useMutation<
		CreateScholarshipApplicationMutationData,
		CreateScholarshipApplicationMutationError,
		CreateScholarshipApplicationMutationParams
	>(
		(params: CreateScholarshipApplicationMutationParams) =>
			createScholarshipApplication(params),
		{
			onError: (error: CreateScholarshipApplicationMutationError) => {
				console.error('Create operation failed:', error);
			},
			onSuccess: (data: CreateScholarshipApplicationMutationData) => {
				console.log('Create operation successful', data);
			},
			...options,
		},
	);
};
