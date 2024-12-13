import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryPaymentMethodPage } from '@wallot/react/src/features/paymentMethods/api/queryPaymentMethodPage';
import {
	UseQueryPaymentMethodPageQueryKeyFn,
	UseQueryPaymentMethodPageOptionsFn,
	UseQueryPaymentMethodPageProps,
} from '@wallot/react/src/features/paymentMethods/types/PaymentMethodReactTypes';

export const getQueryPaymentMethodPageReactQueryKey: UseQueryPaymentMethodPageQueryKeyFn =
	(params) =>
		[
			'payment_method',
			JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
		] as const;

export const getQueryPaymentMethodPageReactQueryOptions: UseQueryPaymentMethodPageOptionsFn =
	(props) => ({
		queryFn: () => queryPaymentMethodPage(props.firestoreQueryOptions),
		queryKey: getQueryPaymentMethodPageReactQueryKey(
			props.firestoreQueryOptions,
		),
		...(props.reactQueryOptions ?? {}),
	});

export const useQueryPaymentMethodPage = ({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryPaymentMethodPageProps) => {
	return ReactQuery.useQuery(
		getQueryPaymentMethodPageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
