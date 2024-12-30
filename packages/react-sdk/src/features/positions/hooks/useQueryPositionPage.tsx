import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryPositionPage } from '@wallot/react/src/features/positions/api/queryPositionPage';
import {
	UseQueryPositionPageQueryKeyFn,
	UseQueryPositionPageOptionsFn,
	UseQueryPositionPageProps,
} from '@wallot/react/src/features/positions/types/PositionReactTypes';

export const getQueryPositionPageReactQueryKey: UseQueryPositionPageQueryKeyFn =
	(params) =>
		[
			'position',
			JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
		] as const;

export const getQueryPositionPageReactQueryOptions: UseQueryPositionPageOptionsFn =
	(props) => ({
		queryFn: () => queryPositionPage(props.firestoreQueryOptions),
		queryKey: getQueryPositionPageReactQueryKey(props.firestoreQueryOptions),
		...(props.reactQueryOptions ?? {}),
	});

export function useQueryPositionPage({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryPositionPageProps) {
	return ReactQuery.useQuery(
		getQueryPositionPageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
}
