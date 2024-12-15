import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryStripeCustomerPage } from '@wallot/react/src/features/stripeCustomers/api/queryStripeCustomerPage';
import {
	UseQueryStripeCustomerPageQueryKeyFn,
	UseQueryStripeCustomerPageOptionsFn,
	UseQueryStripeCustomerPageProps,
} from '@wallot/react/src/features/stripeCustomers/types/StripeCustomerReactTypes';

export const getQueryStripeCustomerPageReactQueryKey: UseQueryStripeCustomerPageQueryKeyFn =
	(params) =>
		[
			'stripe_customer',
			JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
		] as const;

export const getQueryStripeCustomerPageReactQueryOptions: UseQueryStripeCustomerPageOptionsFn =
	(props) => ({
		queryFn: () => queryStripeCustomerPage(props.firestoreQueryOptions),
		queryKey: getQueryStripeCustomerPageReactQueryKey(
			props.firestoreQueryOptions,
		),
		...(props.reactQueryOptions ?? {}),
	});

export const useQueryStripeCustomerPage = ({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryStripeCustomerPageProps) => {
	return ReactQuery.useQuery(
		getQueryStripeCustomerPageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
