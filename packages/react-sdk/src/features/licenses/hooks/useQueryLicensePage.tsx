import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryLicensePage } from '@wallot/react/src/features/licenses/api/queryLicensePage';
import {
	UseQueryLicensePageQueryKeyFn,
	UseQueryLicensePageOptionsFn,
	UseQueryLicensePageProps,
} from '@wallot/react/src/features/licenses/types/LicenseReactTypes';

export const getQueryLicensePageReactQueryKey: UseQueryLicensePageQueryKeyFn = (
	params,
) =>
	[
		'license',
		JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
	] as const;

export const getQueryLicensePageReactQueryOptions: UseQueryLicensePageOptionsFn =
	(props) => ({
		queryFn: () => queryLicensePage(props.firestoreQueryOptions),
		queryKey: getQueryLicensePageReactQueryKey(props.firestoreQueryOptions),
		...(props.reactQueryOptions ?? {}),
	});

export const useQueryLicensePage = ({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryLicensePageProps) => {
	return ReactQuery.useQuery(
		getQueryLicensePageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
