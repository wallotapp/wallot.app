import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryOrderPage } from '@wallot/react/src/features/orders/api/queryOrderPage';
import {
	UseQueryOrderPageQueryKeyFn,
	UseQueryOrderPageOptionsFn,
	UseQueryOrderPageProps,
} from '@wallot/react/src/features/orders/types/OrderReactTypes';

export const getQueryOrderPageReactQueryKey: UseQueryOrderPageQueryKeyFn =
	(params) =>
		[
			'order',
			JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
		] as const;

export const getQueryOrderPageReactQueryOptions: UseQueryOrderPageOptionsFn =
	(props) => ({
		queryFn: () => queryOrderPage(props.firestoreQueryOptions),
		queryKey: getQueryOrderPageReactQueryKey(props.firestoreQueryOptions),
		...(props.reactQueryOptions ?? {}),
	});

export const useQueryOrderPage = ({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryOrderPageProps) => {
	return ReactQuery.useQuery(
		getQueryOrderPageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
