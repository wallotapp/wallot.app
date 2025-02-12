import { useContext } from 'react';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { GeneralizedError } from 'ergonomic';
import { AuthContext } from 'ergonomic-react/src/features/authentication/providers/AuthProvider';
import {
	ScholarshipApplicationFormDataParams,
	ScholarshipApplicationFormDataResponse,
} from '@wallot/js';
import { saveScholarshipApplication } from '@wallot/react/src/features/scholarshipApplications/api/saveScholarshipApplication';

export function useSaveScholarshipApplicationMutation(
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
			saveScholarshipApplication(
				firebaseUser,
				scholarshipApplicationId,
				params,
			),
		{
			onError: (error: GeneralizedError) => {
				console.error('saveScholarshipApplication operation failed:', error);
			},
			onSuccess: (data: ScholarshipApplicationFormDataResponse) => {
				console.log('saveScholarshipApplication operation successful', data);
			},
			...(options ?? {}),
		},
	);
}
