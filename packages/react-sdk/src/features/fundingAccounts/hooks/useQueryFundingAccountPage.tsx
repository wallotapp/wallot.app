import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryFundingAccountPage } from '@wallot/react/src/features/fundingAccounts/api/queryFundingAccountPage';
import {
	UseQueryFundingAccountPageQueryKeyFn,
	UseQueryFundingAccountPageOptionsFn,
	UseQueryFundingAccountPageProps,
} from '@wallot/react/src/features/fundingAccounts/types/FundingAccountReactTypes';

export const getQueryFundingAccountPageReactQueryKey: UseQueryFundingAccountPageQueryKeyFn =
	(params) =>
		[
			'funding_account',
			JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
		] as const;

export const getQueryFundingAccountPageReactQueryOptions: UseQueryFundingAccountPageOptionsFn =
	(props) => ({
		queryFn: () => queryFundingAccountPage(props.firestoreQueryOptions),
		queryKey: getQueryFundingAccountPageReactQueryKey(
			props.firestoreQueryOptions,
		),
		...(props.reactQueryOptions ?? {}),
	});

export const useQueryFundingAccountPage = ({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryFundingAccountPageProps) => {
	return ReactQuery.useQuery(
		getQueryFundingAccountPageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
