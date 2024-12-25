import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryAchTransferPage } from '@wallot/react/src/features/achTransfers/api/queryAchTransferPage';
import {
	UseQueryAchTransferPageQueryKeyFn,
	UseQueryAchTransferPageOptionsFn,
	UseQueryAchTransferPageProps,
} from '@wallot/react/src/features/achTransfers/types/AchTransferReactTypes';

export const getQueryAchTransferPageReactQueryKey: UseQueryAchTransferPageQueryKeyFn =
	(params) =>
		[
			'ach_transfer',
			JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
		] as const;

export const getQueryAchTransferPageReactQueryOptions: UseQueryAchTransferPageOptionsFn =
	(props) => ({
		queryFn: () => queryAchTransferPage(props.firestoreQueryOptions),
		queryKey: getQueryAchTransferPageReactQueryKey(props.firestoreQueryOptions),
		...(props.reactQueryOptions ?? {}),
	});

export const useQueryAchTransferPage = ({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryAchTransferPageProps) => {
	return ReactQuery.useQuery(
		getQueryAchTransferPageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
