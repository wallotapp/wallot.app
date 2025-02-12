import { useContext } from 'react';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { GeneralizedError } from 'ergonomic';
import { AuthContext } from 'ergonomic-react/src/features/authentication/providers/AuthProvider';
import {
	ScholarshipApplicationFormDataParams,
	ScholarshipApplicationFormDataResponse,
} from '@wallot/js';
import { submitScholarshipApplication } from '@wallot/react/src/features/scholarshipApplications/api/submitScholarshipApplication';

export function useSubmitScholarshipApplicationMutation(
	scholarshipApplicationId: string | null,
	options?: UseMutationOptions<
		ScholarshipApplicationFormDataResponse,
		GeneralizedError,
		ScholarshipApplicationFormDataParams
	>,
) {
	const { user: firebaseUser } = useContext(AuthContext);
	return useMutation<
		ScholarshipApplicationFormDataResponse,
		GeneralizedError,
		ScholarshipApplicationFormDataParams
	>(
		(params: ScholarshipApplicationFormDataParams) =>
			submitScholarshipApplication(
				firebaseUser,
				scholarshipApplicationId,
				params,
			),
		{
			onError: (error: GeneralizedError) => {
				console.error('submitScholarshipApplication operation failed:', error);
			},
			onSuccess: (data: ScholarshipApplicationFormDataResponse) => {
				console.log('submitScholarshipApplication operation successful', data);
			},
			...(options ?? {}),
		},
	);
}
