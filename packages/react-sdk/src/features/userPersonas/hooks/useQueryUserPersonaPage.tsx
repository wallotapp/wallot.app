import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryUserPersonaPage } from '@wallot/react/src/features/userPersonas/api/queryUserPersonaPage';
import {
	UseQueryUserPersonaPageQueryKeyFn,
	UseQueryUserPersonaPageOptionsFn,
	UseQueryUserPersonaPageProps,
} from '@wallot/react/src/features/userPersonas/types/UserPersonaReactTypes';

export const getQueryUserPersonaPageReactQueryKey: UseQueryUserPersonaPageQueryKeyFn =
	(params) =>
		[
			'user_persona',
			JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
		] as const;

export const getQueryUserPersonaPageReactQueryOptions: UseQueryUserPersonaPageOptionsFn =
	(props) => ({
		queryFn: () => queryUserPersonaPage(props.firestoreQueryOptions),
		queryKey: getQueryUserPersonaPageReactQueryKey(props.firestoreQueryOptions),
		...(props.reactQueryOptions ?? {}),
	});

export const useQueryUserPersonaPage = ({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryUserPersonaPageProps) => {
	return ReactQuery.useQuery(
		getQueryUserPersonaPageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
