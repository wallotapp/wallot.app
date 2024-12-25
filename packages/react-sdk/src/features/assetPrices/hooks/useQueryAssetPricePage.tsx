import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryAssetPricePage } from '@wallot/react/src/features/assetPrices/api/queryAssetPricePage';
import { UseQueryAssetPricePageQueryKeyFn, UseQueryAssetPricePageOptionsFn, UseQueryAssetPricePageProps } from '@wallot/react/src/features/assetPrices/types/AssetPriceReactTypes';

export const getQueryAssetPricePageReactQueryKey: UseQueryAssetPricePageQueryKeyFn = (params) => ['asset_price', JSON.stringify(R.omit(['startAfterDocumentReference'], params))] as const;

export const getQueryAssetPricePageReactQueryOptions: UseQueryAssetPricePageOptionsFn = (props) => ({
	queryFn: () => queryAssetPricePage(props.firestoreQueryOptions),
	queryKey: getQueryAssetPricePageReactQueryKey(props.firestoreQueryOptions),
	...(props.reactQueryOptions ?? {}),
});

export const useQueryAssetPricePage = ({ firestoreQueryOptions, reactQueryOptions = {} }: UseQueryAssetPricePageProps) => {
	return ReactQuery.useQuery(
		getQueryAssetPricePageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
