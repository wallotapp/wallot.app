import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryAlpacaPositionPage } from '@wallot/react/src/features/alpacaPositions/api/queryAlpacaPositionPage';
import {
	UseQueryAlpacaPositionPageQueryKeyFn,
	UseQueryAlpacaPositionPageOptionsFn,
	UseQueryAlpacaPositionPageProps,
} from '@wallot/react/src/features/alpacaPositions/types/AlpacaPositionReactTypes';

export const getQueryAlpacaPositionPageReactQueryKey: UseQueryAlpacaPositionPageQueryKeyFn =
	(params) =>
		[
			'alpaca_position',
			JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
		] as const;

export const getQueryAlpacaPositionPageReactQueryOptions: UseQueryAlpacaPositionPageOptionsFn =
	(props) => ({
		queryFn: () => queryAlpacaPositionPage(props.firestoreQueryOptions),
		queryKey: getQueryAlpacaPositionPageReactQueryKey(
			props.firestoreQueryOptions,
		),
		...(props.reactQueryOptions ?? {}),
	});

export const useQueryAlpacaPositionPage = ({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryAlpacaPositionPageProps) => {
	return ReactQuery.useQuery(
		getQueryAlpacaPositionPageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
