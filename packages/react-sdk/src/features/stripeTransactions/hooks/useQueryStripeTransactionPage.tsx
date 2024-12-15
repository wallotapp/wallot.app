import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryStripeTransactionPage } from '@wallot/react/src/features/stripeTransactions/api/queryStripeTransactionPage';
import {
	UseQueryStripeTransactionPageQueryKeyFn,
	UseQueryStripeTransactionPageOptionsFn,
	UseQueryStripeTransactionPageProps,
} from '@wallot/react/src/features/stripeTransactions/types/StripeTransactionReactTypes';

export const getQueryStripeTransactionPageReactQueryKey: UseQueryStripeTransactionPageQueryKeyFn =
	(params) =>
		[
			'stripe_transaction',
			JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
		] as const;

export const getQueryStripeTransactionPageReactQueryOptions: UseQueryStripeTransactionPageOptionsFn =
	(props) => ({
		queryFn: () => queryStripeTransactionPage(props.firestoreQueryOptions),
		queryKey: getQueryStripeTransactionPageReactQueryKey(
			props.firestoreQueryOptions,
		),
		...(props.reactQueryOptions ?? {}),
	});

export const useQueryStripeTransactionPage = ({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryStripeTransactionPageProps) => {
	return ReactQuery.useQuery(
		getQueryStripeTransactionPageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
