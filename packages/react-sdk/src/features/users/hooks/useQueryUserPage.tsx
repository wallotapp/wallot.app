import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryUserPage } from '@wallot/react/src/features/users/api/queryUserPage';
import {
	UseQueryUserPageQueryKeyFn,
	UseQueryUserPageOptionsFn,
	UseQueryUserPageProps,
} from '@wallot/react/src/features/users/types/UserReactTypes';

export const getQueryUserPageReactQueryKey: UseQueryUserPageQueryKeyFn =
	(params) =>
		[
			'user',
			JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
		] as const;

export const getQueryUserPageReactQueryOptions: UseQueryUserPageOptionsFn =
	(props) => ({
		queryFn: () => queryUserPage(props.firestoreQueryOptions),
		queryKey: getQueryUserPageReactQueryKey(props.firestoreQueryOptions),
		...(props.reactQueryOptions ?? {}),
	});

export const useQueryUserPage = ({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryUserPageProps) => {
	return ReactQuery.useQuery(
		getQueryUserPageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
