import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryEquityAccountPage } from '@wallot/react/src/features/equityAccounts/api/queryEquityAccountPage';
import {
	UseQueryEquityAccountPageQueryKeyFn,
	UseQueryEquityAccountPageOptionsFn,
	UseQueryEquityAccountPageProps,
} from '@wallot/react/src/features/equityAccounts/types/EquityAccountReactTypes';

export const getQueryEquityAccountPageReactQueryKey: UseQueryEquityAccountPageQueryKeyFn =
	(params) =>
		[
			'equity_account',
			JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
		] as const;

export const getQueryEquityAccountPageReactQueryOptions: UseQueryEquityAccountPageOptionsFn =
	(props) => ({
		queryFn: () => queryEquityAccountPage(props.firestoreQueryOptions),
		queryKey: getQueryEquityAccountPageReactQueryKey(
			props.firestoreQueryOptions,
		),
		...(props.reactQueryOptions ?? {}),
	});

export const useQueryEquityAccountPage = ({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryEquityAccountPageProps) => {
	return ReactQuery.useQuery(
		getQueryEquityAccountPageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
