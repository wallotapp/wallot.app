import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryAssetPage } from '@wallot/react/src/features/assets/api/queryAssetPage';
import {
	UseQueryAssetPageQueryKeyFn,
	UseQueryAssetPageOptionsFn,
	UseQueryAssetPageProps,
} from '@wallot/react/src/features/assets/types/AssetReactTypes';

export const getQueryAssetPageReactQueryKey: UseQueryAssetPageQueryKeyFn = (
	params,
) =>
	[
		'asset',
		JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
	] as const;

export const getQueryAssetPageReactQueryOptions: UseQueryAssetPageOptionsFn = (
	props,
) => ({
	queryFn: () => queryAssetPage(props.firestoreQueryOptions),
	queryKey: getQueryAssetPageReactQueryKey(props.firestoreQueryOptions),
	...(props.reactQueryOptions ?? {}),
});

export const useQueryAssetPage = ({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryAssetPageProps) => {
	return ReactQuery.useQuery(
		getQueryAssetPageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
