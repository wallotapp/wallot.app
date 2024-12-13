import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { querySystemServicePage } from '@wallot/react/src/features/systemServices/api/querySystemServicePage';
import {
	UseQuerySystemServicePageQueryKeyFn,
	UseQuerySystemServicePageOptionsFn,
	UseQuerySystemServicePageProps,
} from '@wallot/react/src/features/systemServices/types/SystemServiceReactTypes';

export const getQuerySystemServicePageReactQueryKey: UseQuerySystemServicePageQueryKeyFn =
	(params) =>
		[
			'system_service',
			JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
		] as const;

export const getQuerySystemServicePageReactQueryOptions: UseQuerySystemServicePageOptionsFn =
	(props) => ({
		queryFn: () => querySystemServicePage(props.firestoreQueryOptions),
		queryKey: getQuerySystemServicePageReactQueryKey(
			props.firestoreQueryOptions,
		),
		...(props.reactQueryOptions ?? {}),
	});

export const useQuerySystemServicePage = ({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQuerySystemServicePageProps) => {
	return ReactQuery.useQuery(
		getQuerySystemServicePageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
