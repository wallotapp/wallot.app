import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryScholarshipApplicationPage } from '@wallot/react/src/features/scholarshipApplications/api/queryScholarshipApplicationPage';
import {
	UseQueryScholarshipApplicationPageQueryKeyFn,
	UseQueryScholarshipApplicationPageOptionsFn,
	UseQueryScholarshipApplicationPageProps,
} from '@wallot/react/src/features/scholarshipApplications/types/ScholarshipApplicationReactTypes';

export const getQueryScholarshipApplicationPageReactQueryKey: UseQueryScholarshipApplicationPageQueryKeyFn =
	(params) =>
		[
			'scholarship_application',
			JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
		] as const;

export const getQueryScholarshipApplicationPageReactQueryOptions: UseQueryScholarshipApplicationPageOptionsFn =
	(props) => ({
		queryFn: () => queryScholarshipApplicationPage(props.firestoreQueryOptions),
		queryKey: getQueryScholarshipApplicationPageReactQueryKey(
			props.firestoreQueryOptions,
		),
		...(props.reactQueryOptions ?? {}),
	});

export function useQueryScholarshipApplicationPage({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryScholarshipApplicationPageProps) {
	return ReactQuery.useQuery(
		getQueryScholarshipApplicationPageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
