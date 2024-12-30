import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryIdentityVerificationDocumentPage } from '@wallot/react/src/features/identityVerificationDocuments/api/queryIdentityVerificationDocumentPage';
import {
	UseQueryIdentityVerificationDocumentPageQueryKeyFn,
	UseQueryIdentityVerificationDocumentPageOptionsFn,
	UseQueryIdentityVerificationDocumentPageProps,
} from '@wallot/react/src/features/identityVerificationDocuments/types/IdentityVerificationDocumentReactTypes';

export const getQueryIdentityVerificationDocumentPageReactQueryKey: UseQueryIdentityVerificationDocumentPageQueryKeyFn =
	(params) =>
		[
			'identity_verification_document',
			JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
		] as const;

export const getQueryIdentityVerificationDocumentPageReactQueryOptions: UseQueryIdentityVerificationDocumentPageOptionsFn =
	(props) => ({
		queryFn: () =>
			queryIdentityVerificationDocumentPage(props.firestoreQueryOptions),
		queryKey: getQueryIdentityVerificationDocumentPageReactQueryKey(
			props.firestoreQueryOptions,
		),
		...(props.reactQueryOptions ?? {}),
	});

export function useQueryIdentityVerificationDocumentPage({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryIdentityVerificationDocumentPageProps) {
	return ReactQuery.useQuery(
		getQueryIdentityVerificationDocumentPageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
}
