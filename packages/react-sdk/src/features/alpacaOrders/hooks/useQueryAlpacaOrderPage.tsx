import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryAlpacaOrderPage } from '@wallot/react/src/features/alpacaOrders/api/queryAlpacaOrderPage';
import {
	UseQueryAlpacaOrderPageQueryKeyFn,
	UseQueryAlpacaOrderPageOptionsFn,
	UseQueryAlpacaOrderPageProps,
} from '@wallot/react/src/features/alpacaOrders/types/AlpacaOrderReactTypes';

export const getQueryAlpacaOrderPageReactQueryKey: UseQueryAlpacaOrderPageQueryKeyFn =
	(params) =>
		[
			'alpaca_order',
			JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
		] as const;

export const getQueryAlpacaOrderPageReactQueryOptions: UseQueryAlpacaOrderPageOptionsFn =
	(props) => ({
		queryFn: () => queryAlpacaOrderPage(props.firestoreQueryOptions),
		queryKey: getQueryAlpacaOrderPageReactQueryKey(props.firestoreQueryOptions),
		...(props.reactQueryOptions ?? {}),
	});

export const useQueryAlpacaOrderPage = ({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryAlpacaOrderPageProps) => {
	return ReactQuery.useQuery(
		getQueryAlpacaOrderPageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
