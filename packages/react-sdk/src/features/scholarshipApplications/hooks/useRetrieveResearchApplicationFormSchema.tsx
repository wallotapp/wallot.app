import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ResearchApplicationFormSchema } from '@wallot/js';
import { GeneralizedError } from 'ergonomic';
import { retrieveResearchApplicationFormSchema } from '../api/retrieveResearchApplicationFormSchema';

export const retrieveResearchApplicationFormSchemaQueryKey = [
	'retrieveResearchApplicationFormSchema',
] as const;

export function useRetrieveResearchApplicationFormSchema(
	options?: UseQueryOptions<
		ResearchApplicationFormSchema,
		GeneralizedError,
		ResearchApplicationFormSchema
	>,
) {
	return useQuery<
		ResearchApplicationFormSchema,
		GeneralizedError,
		ResearchApplicationFormSchema
	>({
		queryKey: retrieveResearchApplicationFormSchemaQueryKey,
		queryFn: retrieveResearchApplicationFormSchema,
		onError: (error: GeneralizedError) => {
			console.error(
				'retrieveResearchApplicationFormSchema operation failed:',
				error,
			);
		},
		onSuccess: (data: ResearchApplicationFormSchema) => {
			console.log(
				'retrieveResearchApplicationFormSchema operation successful',
				data,
			);
		},
		...(options ?? {}),
		enabled: options?.enabled ?? true,
	});
}
