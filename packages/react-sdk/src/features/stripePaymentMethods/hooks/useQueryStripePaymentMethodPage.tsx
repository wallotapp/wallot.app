import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryStripePaymentMethodPage } from '@wallot/react/src/features/stripePaymentMethods/api/queryStripePaymentMethodPage';
import {
	UseQueryStripePaymentMethodPageQueryKeyFn,
	UseQueryStripePaymentMethodPageOptionsFn,
	UseQueryStripePaymentMethodPageProps,
} from '@wallot/react/src/features/stripePaymentMethods/types/StripePaymentMethodReactTypes';

export const getQueryStripePaymentMethodPageReactQueryKey: UseQueryStripePaymentMethodPageQueryKeyFn =
	(params) =>
		[
			'stripe_payment_method',
			JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
		] as const;

export const getQueryStripePaymentMethodPageReactQueryOptions: UseQueryStripePaymentMethodPageOptionsFn =
	(props) => ({
		queryFn: () => queryStripePaymentMethodPage(props.firestoreQueryOptions),
		queryKey: getQueryStripePaymentMethodPageReactQueryKey(
			props.firestoreQueryOptions,
		),
		...(props.reactQueryOptions ?? {}),
	});

export const useQueryStripePaymentMethodPage = ({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryStripePaymentMethodPageProps) => {
	return ReactQuery.useQuery(
		getQueryStripePaymentMethodPageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
