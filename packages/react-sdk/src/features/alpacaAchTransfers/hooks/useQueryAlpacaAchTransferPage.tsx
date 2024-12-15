import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryAlpacaAchTransferPage } from '@wallot/react/src/features/alpacaAchTransfers/api/queryAlpacaAchTransferPage';
import {
	UseQueryAlpacaAchTransferPageQueryKeyFn,
	UseQueryAlpacaAchTransferPageOptionsFn,
	UseQueryAlpacaAchTransferPageProps,
} from '@wallot/react/src/features/alpacaAchTransfers/types/AlpacaAchTransferReactTypes';

export const getQueryAlpacaAchTransferPageReactQueryKey: UseQueryAlpacaAchTransferPageQueryKeyFn =
	(params) =>
		[
			'alpaca_ach_transfer',
			JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
		] as const;

export const getQueryAlpacaAchTransferPageReactQueryOptions: UseQueryAlpacaAchTransferPageOptionsFn =
	(props) => ({
		queryFn: () => queryAlpacaAchTransferPage(props.firestoreQueryOptions),
		queryKey: getQueryAlpacaAchTransferPageReactQueryKey(
			props.firestoreQueryOptions,
		),
		...(props.reactQueryOptions ?? {}),
	});

export const useQueryAlpacaAchTransferPage = ({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryAlpacaAchTransferPageProps) => {
	return ReactQuery.useQuery(
		getQueryAlpacaAchTransferPageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
