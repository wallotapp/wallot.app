import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryAlphaVantageStockPricePage } from '@wallot/react/src/features/alphaVantageStockPrices/api/queryAlphaVantageStockPricePage';
import {
	UseQueryAlphaVantageStockPricePageQueryKeyFn,
	UseQueryAlphaVantageStockPricePageOptionsFn,
	UseQueryAlphaVantageStockPricePageProps,
} from '@wallot/react/src/features/alphaVantageStockPrices/types/AlphaVantageStockPriceReactTypes';

export const getQueryAlphaVantageStockPricePageReactQueryKey: UseQueryAlphaVantageStockPricePageQueryKeyFn =
	(params) =>
		[
			'alpha_vantage_stock_price',
			JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
		] as const;

export const getQueryAlphaVantageStockPricePageReactQueryOptions: UseQueryAlphaVantageStockPricePageOptionsFn =
	(props) => ({
		queryFn: () => queryAlphaVantageStockPricePage(props.firestoreQueryOptions),
		queryKey: getQueryAlphaVantageStockPricePageReactQueryKey(
			props.firestoreQueryOptions,
		),
		...(props.reactQueryOptions ?? {}),
	});

export const useQueryAlphaVantageStockPricePage = ({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryAlphaVantageStockPricePageProps) => {
	return ReactQuery.useQuery(
		getQueryAlphaVantageStockPricePageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
