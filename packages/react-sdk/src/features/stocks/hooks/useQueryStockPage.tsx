import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryStockPage } from '@wallot/react/src/features/stocks/api/queryStockPage';
import {
	UseQueryStockPageQueryKeyFn,
	UseQueryStockPageOptionsFn,
	UseQueryStockPageProps,
} from '@wallot/react/src/features/stocks/types/StockReactTypes';

export const getQueryStockPageReactQueryKey: UseQueryStockPageQueryKeyFn =
	(params) =>
		[
			'stock',
			JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
		] as const;

export const getQueryStockPageReactQueryOptions: UseQueryStockPageOptionsFn =
	(props) => ({
		queryFn: () => queryStockPage(props.firestoreQueryOptions),
		queryKey: getQueryStockPageReactQueryKey(props.firestoreQueryOptions),
		...(props.reactQueryOptions ?? {}),
	});

export const useQueryStockPage = ({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryStockPageProps) => {
	return ReactQuery.useQuery(
		getQueryStockPageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
