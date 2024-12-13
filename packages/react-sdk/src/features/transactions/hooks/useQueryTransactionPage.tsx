import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryTransactionPage } from '@wallot/react/src/features/transactions/api/queryTransactionPage';
import {
	UseQueryTransactionPageQueryKeyFn,
	UseQueryTransactionPageOptionsFn,
	UseQueryTransactionPageProps,
} from '@wallot/react/src/features/transactions/types/TransactionReactTypes';

export const getQueryTransactionPageReactQueryKey: UseQueryTransactionPageQueryKeyFn =
	(params) =>
		[
			'transaction',
			JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
		] as const;

export const getQueryTransactionPageReactQueryOptions: UseQueryTransactionPageOptionsFn =
	(props) => ({
		queryFn: () => queryTransactionPage(props.firestoreQueryOptions),
		queryKey: getQueryTransactionPageReactQueryKey(props.firestoreQueryOptions),
		...(props.reactQueryOptions ?? {}),
	});

export const useQueryTransactionPage = ({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryTransactionPageProps) => {
	return ReactQuery.useQuery(
		getQueryTransactionPageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
