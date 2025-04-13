import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
	ResearchAcceptanceLetter,
	AcceptResearchSeatFormDataParams,
} from '@wallot/js';
import { retrieveAcceptanceLetter } from '@wallot/react/src/features/scholarshipApplications/api/retrieveAcceptanceLetter';
import { GeneralizedError } from 'ergonomic';

export function useRetrieveAcceptanceLetter(
	searchParams: Pick<AcceptResearchSeatFormDataParams, 'client_verification'>,
	options?: UseQueryOptions<
		ResearchAcceptanceLetter,
		GeneralizedError,
		ResearchAcceptanceLetter,
		[
			'retrieveAcceptanceLetter',
			Pick<AcceptResearchSeatFormDataParams, 'client_verification'>,
		]
	>,
) {
	return useQuery<
		ResearchAcceptanceLetter,
		GeneralizedError,
		ResearchAcceptanceLetter,
		[
			'retrieveAcceptanceLetter',
			Pick<AcceptResearchSeatFormDataParams, 'client_verification'>,
		]
	>({
		queryKey: ['retrieveAcceptanceLetter' as const, searchParams],
		queryFn: () => retrieveAcceptanceLetter(searchParams),
		onError: (error: GeneralizedError) => {
			console.error('retrieveAcceptanceLetter operation failed:', error);
		},
		onSuccess: (data: ResearchAcceptanceLetter) => {
			console.log('retrieveAcceptanceLetter operation successful', data);
		},
		...(options ?? {}),
	});
}
