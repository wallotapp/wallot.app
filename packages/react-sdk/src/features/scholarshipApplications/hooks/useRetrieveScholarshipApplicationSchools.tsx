import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { School } from '@wallot/js';
import { GeneralizedError } from 'ergonomic';
import { retrieveScholarshipApplicationSchools } from '../api/retrieveScholarshipApplicationSchools';

export const retrieveScholarshipApplicationSchoolsQueryKey = [
	'retrieveScholarshipApplicationSchools',
] as const;

export function useRetrieveScholarshipApplicationSchools(
	options?: UseQueryOptions<School[], GeneralizedError, School[]>,
) {
	return useQuery<School[], GeneralizedError, School[]>({
		queryKey: retrieveScholarshipApplicationSchoolsQueryKey,
		queryFn: retrieveScholarshipApplicationSchools,
		onError: (error: GeneralizedError) => {
			console.error(
				'retrieveScholarshipApplicationSchools operation failed:',
				error,
			);
		},
		onSuccess: (data: School[]) => {
			console.log(
				'retrieveScholarshipApplicationSchools operation successful',
				data,
			);
		},
		...(options ?? {}),
		enabled: options?.enabled ?? true,
	});
}
