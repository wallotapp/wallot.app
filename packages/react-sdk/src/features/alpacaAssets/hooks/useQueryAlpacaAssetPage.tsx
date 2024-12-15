import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryAlpacaAssetPage } from '@wallot/react/src/features/alpacaAssets/api/queryAlpacaAssetPage';
import {
	UseQueryAlpacaAssetPageQueryKeyFn,
	UseQueryAlpacaAssetPageOptionsFn,
	UseQueryAlpacaAssetPageProps,
} from '@wallot/react/src/features/alpacaAssets/types/AlpacaAssetReactTypes';

export const getQueryAlpacaAssetPageReactQueryKey: UseQueryAlpacaAssetPageQueryKeyFn =
	(params) =>
		[
			'alpaca_asset',
			JSON.stringify(R.omit(['startAfterDocumentReference'], params)),
		] as const;

export const getQueryAlpacaAssetPageReactQueryOptions: UseQueryAlpacaAssetPageOptionsFn =
	(props) => ({
		queryFn: () => queryAlpacaAssetPage(props.firestoreQueryOptions),
		queryKey: getQueryAlpacaAssetPageReactQueryKey(props.firestoreQueryOptions),
		...(props.reactQueryOptions ?? {}),
	});

export const useQueryAlpacaAssetPage = ({
	firestoreQueryOptions,
	reactQueryOptions = {},
}: UseQueryAlpacaAssetPageProps) => {
	return ReactQuery.useQuery(
		getQueryAlpacaAssetPageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
