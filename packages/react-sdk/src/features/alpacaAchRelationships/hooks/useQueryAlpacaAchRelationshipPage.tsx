import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryAlpacaAchRelationshipPage } from '@wallot/react/src/features/alpacaAchRelationships/api/queryAlpacaAchRelationshipPage';
import {
	UseQueryAlpacaAchRelationshipPageQueryKeyFn,
	UseQueryAlpacaAchRelationshipPageOptionsFn,
	UseQueryAlpacaAchRelationshipPageProps,
} from '@wallot/react/src/features/alpacaAchRelationships/types/AlpacaAchRelationshipReactTypes';

export const getQueryAlpacaAchRelationshipPageReactQueryKey: UseQueryAlpacaAchRelationshipPageQueryKeyFn =
	(params) =>
		[
			'alpaca_ach_relationship',
			JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
		] as const;

export const getQueryAlpacaAchRelationshipPageReactQueryOptions: UseQueryAlpacaAchRelationshipPageOptionsFn =
	(props) => ({
		queryFn: () => queryAlpacaAchRelationshipPage(props.firestoreQueryOptions),
		queryKey: getQueryAlpacaAchRelationshipPageReactQueryKey(
			props.firestoreQueryOptions,
		),
		...(props.reactQueryOptions ?? {}),
	});

export const useQueryAlpacaAchRelationshipPage = ({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryAlpacaAchRelationshipPageProps) => {
	return ReactQuery.useQuery(
		getQueryAlpacaAchRelationshipPageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
