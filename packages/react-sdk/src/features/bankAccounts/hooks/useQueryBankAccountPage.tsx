import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryBankAccountPage } from '@wallot/react/src/features/bankAccounts/api/queryBankAccountPage';
import {
	UseQueryBankAccountPageQueryKeyFn,
	UseQueryBankAccountPageOptionsFn,
	UseQueryBankAccountPageProps,
} from '@wallot/react/src/features/bankAccounts/types/BankAccountReactTypes';

export const getQueryBankAccountPageReactQueryKey: UseQueryBankAccountPageQueryKeyFn =
	(params) =>
		[
			'bank_account',
			JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
		] as const;

export const getQueryBankAccountPageReactQueryOptions: UseQueryBankAccountPageOptionsFn =
	(props) => ({
		queryFn: () => queryBankAccountPage(props.firestoreQueryOptions),
		queryKey: getQueryBankAccountPageReactQueryKey(props.firestoreQueryOptions),
		...(props.reactQueryOptions ?? {}),
	});

export const useQueryBankAccountPage = ({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryBankAccountPageProps) => {
	return ReactQuery.useQuery(
		getQueryBankAccountPageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
