import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryStripeInvoicePage } from '@wallot/react/src/features/stripeInvoices/api/queryStripeInvoicePage';
import {
	UseQueryStripeInvoicePageQueryKeyFn,
	UseQueryStripeInvoicePageOptionsFn,
	UseQueryStripeInvoicePageProps,
} from '@wallot/react/src/features/stripeInvoices/types/StripeInvoiceReactTypes';

export const getQueryStripeInvoicePageReactQueryKey: UseQueryStripeInvoicePageQueryKeyFn =
	(params) =>
		[
			'stripe_invoice',
			JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
		] as const;

export const getQueryStripeInvoicePageReactQueryOptions: UseQueryStripeInvoicePageOptionsFn =
	(props) => ({
		queryFn: () => queryStripeInvoicePage(props.firestoreQueryOptions),
		queryKey: getQueryStripeInvoicePageReactQueryKey(
			props.firestoreQueryOptions,
		),
		...(props.reactQueryOptions ?? {}),
	});

export const useQueryStripeInvoicePage = ({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryStripeInvoicePageProps) => {
	return ReactQuery.useQuery(
		getQueryStripeInvoicePageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
