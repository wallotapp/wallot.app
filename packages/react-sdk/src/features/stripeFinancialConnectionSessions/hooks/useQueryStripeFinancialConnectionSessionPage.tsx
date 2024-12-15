import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryStripeFinancialConnectionSessionPage } from '@wallot/react/src/features/stripeFinancialConnectionSessions/api/queryStripeFinancialConnectionSessionPage';
import {
	UseQueryStripeFinancialConnectionSessionPageQueryKeyFn,
	UseQueryStripeFinancialConnectionSessionPageOptionsFn,
	UseQueryStripeFinancialConnectionSessionPageProps,
} from '@wallot/react/src/features/stripeFinancialConnectionSessions/types/StripeFinancialConnectionSessionReactTypes';

export const getQueryStripeFinancialConnectionSessionPageReactQueryKey: UseQueryStripeFinancialConnectionSessionPageQueryKeyFn =
	(params) =>
		[
			'stripe_financial_connection_session',
			JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
		] as const;

export const getQueryStripeFinancialConnectionSessionPageReactQueryOptions: UseQueryStripeFinancialConnectionSessionPageOptionsFn =
	(props) => ({
		queryFn: () =>
			queryStripeFinancialConnectionSessionPage(props.firestoreQueryOptions),
		queryKey: getQueryStripeFinancialConnectionSessionPageReactQueryKey(
			props.firestoreQueryOptions,
		),
		...(props.reactQueryOptions ?? {}),
	});

export const useQueryStripeFinancialConnectionSessionPage = ({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryStripeFinancialConnectionSessionPageProps) => {
	return ReactQuery.useQuery(
		getQueryStripeFinancialConnectionSessionPageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
