import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryStripeFinancialConnectionAccountPage } from '@wallot/react/src/features/stripeFinancialConnectionAccounts/api/queryStripeFinancialConnectionAccountPage';
import {
	UseQueryStripeFinancialConnectionAccountPageQueryKeyFn,
	UseQueryStripeFinancialConnectionAccountPageOptionsFn,
	UseQueryStripeFinancialConnectionAccountPageProps,
} from '@wallot/react/src/features/stripeFinancialConnectionAccounts/types/StripeFinancialConnectionAccountReactTypes';

export const getQueryStripeFinancialConnectionAccountPageReactQueryKey: UseQueryStripeFinancialConnectionAccountPageQueryKeyFn =
	(params) =>
		[
			'stripe_financial_connection_account',
			JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
		] as const;

export const getQueryStripeFinancialConnectionAccountPageReactQueryOptions: UseQueryStripeFinancialConnectionAccountPageOptionsFn =
	(props) => ({
		queryFn: () =>
			queryStripeFinancialConnectionAccountPage(props.firestoreQueryOptions),
		queryKey: getQueryStripeFinancialConnectionAccountPageReactQueryKey(
			props.firestoreQueryOptions,
		),
		...(props.reactQueryOptions ?? {}),
	});

export const useQueryStripeFinancialConnectionAccountPage = ({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryStripeFinancialConnectionAccountPageProps) => {
	return ReactQuery.useQuery(
		getQueryStripeFinancialConnectionAccountPageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
