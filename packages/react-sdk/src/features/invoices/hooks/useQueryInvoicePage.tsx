import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryInvoicePage } from '@wallot/react/src/features/invoices/api/queryInvoicePage';
import {
	UseQueryInvoicePageQueryKeyFn,
	UseQueryInvoicePageOptionsFn,
	UseQueryInvoicePageProps,
} from '@wallot/react/src/features/invoices/types/InvoiceReactTypes';

export const getQueryInvoicePageReactQueryKey: UseQueryInvoicePageQueryKeyFn = (
	params,
) =>
	[
		'invoice',
		JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
	] as const;

export const getQueryInvoicePageReactQueryOptions: UseQueryInvoicePageOptionsFn =
	(props) => ({
		queryFn: () => queryInvoicePage(props.firestoreQueryOptions),
		queryKey: getQueryInvoicePageReactQueryKey(props.firestoreQueryOptions),
		...(props.reactQueryOptions ?? {}),
	});

export const useQueryInvoicePage = ({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryInvoicePageProps) => {
	return ReactQuery.useQuery(
		getQueryInvoicePageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
