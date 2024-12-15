import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryStripeSubscriptionPage } from '@wallot/react/src/features/stripeSubscriptions/api/queryStripeSubscriptionPage';
import {
	UseQueryStripeSubscriptionPageQueryKeyFn,
	UseQueryStripeSubscriptionPageOptionsFn,
	UseQueryStripeSubscriptionPageProps,
} from '@wallot/react/src/features/stripeSubscriptions/types/StripeSubscriptionReactTypes';

export const getQueryStripeSubscriptionPageReactQueryKey: UseQueryStripeSubscriptionPageQueryKeyFn =
	(params) =>
		[
			'stripe_subscription',
			JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
		] as const;

export const getQueryStripeSubscriptionPageReactQueryOptions: UseQueryStripeSubscriptionPageOptionsFn =
	(props) => ({
		queryFn: () => queryStripeSubscriptionPage(props.firestoreQueryOptions),
		queryKey: getQueryStripeSubscriptionPageReactQueryKey(
			props.firestoreQueryOptions,
		),
		...(props.reactQueryOptions ?? {}),
	});

export const useQueryStripeSubscriptionPage = ({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryStripeSubscriptionPageProps) => {
	return ReactQuery.useQuery(
		getQueryStripeSubscriptionPageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
