import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryStripeFinancialConnectionsAccountPage } from '@wallot/react/src/features/stripeFinancialConnectionsAccounts/api/queryStripeFinancialConnectionsAccountPage';
import {
	UseQueryStripeFinancialConnectionsAccountPageQueryKeyFn,
	UseQueryStripeFinancialConnectionsAccountPageOptionsFn,
	UseQueryStripeFinancialConnectionsAccountPageProps,
} from '@wallot/react/src/features/stripeFinancialConnectionsAccounts/types/StripeFinancialConnectionsAccountReactTypes';

export const getQueryStripeFinancialConnectionsAccountPageReactQueryKey: UseQueryStripeFinancialConnectionsAccountPageQueryKeyFn =
	(params) =>
		[
			'stripe_financial_connections_account',
			JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
		] as const;

export const getQueryStripeFinancialConnectionsAccountPageReactQueryOptions: UseQueryStripeFinancialConnectionsAccountPageOptionsFn =
	(props) => ({
		queryFn: () =>
			queryStripeFinancialConnectionsAccountPage(props.firestoreQueryOptions),
		queryKey: getQueryStripeFinancialConnectionsAccountPageReactQueryKey(
			props.firestoreQueryOptions,
		),
		...(props.reactQueryOptions ?? {}),
	});

export const useQueryStripeFinancialConnectionsAccountPage = ({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryStripeFinancialConnectionsAccountPageProps) => {
	return ReactQuery.useQuery(
		getQueryStripeFinancialConnectionsAccountPageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
