import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryTeamPage } from '@wallot/react/src/features/teams/api/queryTeamPage';
import {
	UseQueryTeamPageQueryKeyFn,
	UseQueryTeamPageOptionsFn,
	UseQueryTeamPageProps,
} from '@wallot/react/src/features/teams/types/TeamReactTypes';

export const getQueryTeamPageReactQueryKey: UseQueryTeamPageQueryKeyFn =
	(params) =>
		[
			'team',
			JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
		] as const;

export const getQueryTeamPageReactQueryOptions: UseQueryTeamPageOptionsFn =
	(props) => ({
		queryFn: () => queryTeamPage(props.firestoreQueryOptions),
		queryKey: getQueryTeamPageReactQueryKey(props.firestoreQueryOptions),
		...(props.reactQueryOptions ?? {}),
	});

export const useQueryTeamPage = ({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryTeamPageProps) => {
	return ReactQuery.useQuery(
		getQueryTeamPageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
