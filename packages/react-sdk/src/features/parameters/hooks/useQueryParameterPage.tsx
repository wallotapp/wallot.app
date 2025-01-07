import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryParameterPage } from '@wallot/react/src/features/parameters/api/queryParameterPage';
import {
	UseQueryParameterPageQueryKeyFn,
	UseQueryParameterPageOptionsFn,
	UseQueryParameterPageProps,
} from '@wallot/react/src/features/parameters/types/ParameterReactTypes';

export const getQueryParameterPageReactQueryKey: UseQueryParameterPageQueryKeyFn =
	(params) =>
		[
			'parameter',
			JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
		] as const;

export const getQueryParameterPageReactQueryOptions: UseQueryParameterPageOptionsFn =
	(props) => ({
		queryFn: () => queryParameterPage(props.firestoreQueryOptions),
		queryKey: getQueryParameterPageReactQueryKey(props.firestoreQueryOptions),
		...(props.reactQueryOptions ?? {}),
	});

export function useQueryParameterPage({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryParameterPageProps) {
	return ReactQuery.useQuery(
		getQueryParameterPageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
}
