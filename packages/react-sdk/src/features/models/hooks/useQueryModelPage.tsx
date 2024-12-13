import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryModelPage } from '@wallot/react/src/features/models/api/queryModelPage';
import {
	UseQueryModelPageQueryKeyFn,
	UseQueryModelPageOptionsFn,
	UseQueryModelPageProps,
} from '@wallot/react/src/features/models/types/ModelReactTypes';

export const getQueryModelPageReactQueryKey: UseQueryModelPageQueryKeyFn = (
	params,
) =>
	[
		'model',
		JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
	] as const;

export const getQueryModelPageReactQueryOptions: UseQueryModelPageOptionsFn = (
	props,
) => ({
	queryFn: () => queryModelPage(props.firestoreQueryOptions),
	queryKey: getQueryModelPageReactQueryKey(props.firestoreQueryOptions),
	...(props.reactQueryOptions ?? {}),
});

export const useQueryModelPage = ({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryModelPageProps) => {
	return ReactQuery.useQuery(
		getQueryModelPageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
