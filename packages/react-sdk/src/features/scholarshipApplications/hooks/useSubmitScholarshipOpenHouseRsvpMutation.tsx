import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { GeneralizedError } from 'ergonomic';
import {
	ScholarshipOpenHouseRsvpFormDataParams,
	ScholarshipOpenHouseRsvpFormDataResponse,
} from '@wallot/js';
import { submitScholarshipOpenHouseRsvp } from '@wallot/react/src/features/scholarshipApplications/api/submitScholarshipOpenHouseRsvp';

export function useSubmitScholarshipOpenHouseRsvpMutation(
	options?: UseMutationOptions<
		ScholarshipOpenHouseRsvpFormDataResponse,
		GeneralizedError,
		ScholarshipOpenHouseRsvpFormDataParams
	>,
) {
	return useMutation<
		ScholarshipOpenHouseRsvpFormDataResponse,
		GeneralizedError,
		ScholarshipOpenHouseRsvpFormDataParams
	>(
		(params: ScholarshipOpenHouseRsvpFormDataParams) =>
			submitScholarshipOpenHouseRsvp(params),
		{
			onError: (error: GeneralizedError) => {
				console.error(
					'submitScholarshipOpenHouseRsvp operation failed:',
					error,
				);
			},
			onSuccess: (data: ScholarshipOpenHouseRsvpFormDataResponse) => {
				console.log(
					'submitScholarshipOpenHouseRsvp operation successful',
					data,
				);
			},
			...(options ?? {}),
		},
	);
}
