import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryAuthCredentialPage } from '@wallot/react/src/features/authCredentials/api/queryAuthCredentialPage';
import {
	UseQueryAuthCredentialPageQueryKeyFn,
	UseQueryAuthCredentialPageOptionsFn,
	UseQueryAuthCredentialPageProps,
} from '@wallot/react/src/features/authCredentials/types/AuthCredentialReactTypes';

export const getQueryAuthCredentialPageReactQueryKey: UseQueryAuthCredentialPageQueryKeyFn =
	(params) =>
		[
			'auth_credential',
			JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
		] as const;

export const getQueryAuthCredentialPageReactQueryOptions: UseQueryAuthCredentialPageOptionsFn =
	(props) => ({
		queryFn: () => queryAuthCredentialPage(props.firestoreQueryOptions),
		queryKey: getQueryAuthCredentialPageReactQueryKey(props.firestoreQueryOptions),
		...(props.reactQueryOptions ?? {}),
	});

export const useQueryAuthCredentialPage = ({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryAuthCredentialPageProps) => {
	return ReactQuery.useQuery(
		getQueryAuthCredentialPageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
