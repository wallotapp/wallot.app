import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryStockPricePage } from '@wallot/react/src/features/stockPrices/api/queryStockPricePage';
import {
	UseQueryStockPricePageQueryKeyFn,
	UseQueryStockPricePageOptionsFn,
	UseQueryStockPricePageProps,
} from '@wallot/react/src/features/stockPrices/types/StockPriceReactTypes';

export const getQueryStockPricePageReactQueryKey: UseQueryStockPricePageQueryKeyFn =
	(params) =>
		[
			'stock_price',
			JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
		] as const;

export const getQueryStockPricePageReactQueryOptions: UseQueryStockPricePageOptionsFn =
	(props) => ({
		queryFn: () => queryStockPricePage(props.firestoreQueryOptions),
		queryKey: getQueryStockPricePageReactQueryKey(props.firestoreQueryOptions),
		...(props.reactQueryOptions ?? {}),
	});

export const useQueryStockPricePage = ({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryStockPricePageProps) => {
	return ReactQuery.useQuery(
		getQueryStockPricePageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
