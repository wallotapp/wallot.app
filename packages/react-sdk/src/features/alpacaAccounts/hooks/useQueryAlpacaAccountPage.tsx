import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryAlpacaAccountPage } from '@wallot/react/src/features/alpacaAccounts/api/queryAlpacaAccountPage';
import {
	UseQueryAlpacaAccountPageQueryKeyFn,
	UseQueryAlpacaAccountPageOptionsFn,
	UseQueryAlpacaAccountPageProps,
} from '@wallot/react/src/features/alpacaAccounts/types/AlpacaAccountReactTypes';

export const getQueryAlpacaAccountPageReactQueryKey: UseQueryAlpacaAccountPageQueryKeyFn =
	(params) =>
		[
			'alpaca_account',
			JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
		] as const;

export const getQueryAlpacaAccountPageReactQueryOptions: UseQueryAlpacaAccountPageOptionsFn =
	(props) => ({
		queryFn: () => queryAlpacaAccountPage(props.firestoreQueryOptions),
		queryKey: getQueryAlpacaAccountPageReactQueryKey(
			props.firestoreQueryOptions,
		),
		...(props.reactQueryOptions ?? {}),
	});

export const useQueryAlpacaAccountPage = ({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryAlpacaAccountPageProps) => {
	return ReactQuery.useQuery(
		getQueryAlpacaAccountPageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
