import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryStockOrderPage } from '@wallot/react/src/features/stockOrders/api/queryStockOrderPage';
import {
	UseQueryStockOrderPageQueryKeyFn,
	UseQueryStockOrderPageOptionsFn,
	UseQueryStockOrderPageProps,
} from '@wallot/react/src/features/stockOrders/types/StockOrderReactTypes';

export const getQueryStockOrderPageReactQueryKey: UseQueryStockOrderPageQueryKeyFn =
	(params) =>
		[
			'stock_order',
			JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
		] as const;

export const getQueryStockOrderPageReactQueryOptions: UseQueryStockOrderPageOptionsFn =
	(props) => ({
		queryFn: () => queryStockOrderPage(props.firestoreQueryOptions),
		queryKey: getQueryStockOrderPageReactQueryKey(props.firestoreQueryOptions),
		...(props.reactQueryOptions ?? {}),
	});

export const useQueryStockOrderPage = ({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryStockOrderPageProps) => {
	return ReactQuery.useQuery(
		getQueryStockOrderPageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
