import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { GeneralizedError } from 'ergonomic';
import {
	AcceptResearchSeatFormDataParams,
	AcceptResearchSeatFormDataResponse,
} from '@wallot/js';
import { acceptResearchSeat } from '@wallot/react/src/features/scholarshipApplications/api/acceptResearchSeat';

export function useAcceptResearchSeatMutation(
	scholarshipApplicationId: string | null,
	options?: UseMutationOptions<
		AcceptResearchSeatFormDataResponse,
		GeneralizedError,
		AcceptResearchSeatFormDataParams
	>,
) {
	return useMutation<
		AcceptResearchSeatFormDataResponse,
		GeneralizedError,
		AcceptResearchSeatFormDataParams
	>(
		(params: AcceptResearchSeatFormDataParams) =>
			acceptResearchSeat(scholarshipApplicationId, params),
		{
			onError: (error: GeneralizedError) => {
				console.error('acceptResearchSeat operation failed:', error);
			},
			onSuccess: (data: AcceptResearchSeatFormDataResponse) => {
				console.log('acceptResearchSeat operation successful', data);
			},
			...(options ?? {}),
		},
	);
}
