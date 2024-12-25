import * as R from 'ramda';
import * as ReactQuery from '@tanstack/react-query';
import { queryAssetOrderPage } from '@wallot/react/src/features/assetOrders/api/queryAssetOrderPage';
import { UseQueryAssetOrderPageQueryKeyFn, UseQueryAssetOrderPageOptionsFn, UseQueryAssetOrderPageProps } from '@wallot/react/src/features/assetOrders/types/AssetOrderReactTypes';

export const getQueryAssetOrderPageReactQueryKey: UseQueryAssetOrderPageQueryKeyFn = (params) => ['asset_order', JSON.stringify(R.omit(['startAfterDocumentReference'], params))] as const;

export const getQueryAssetOrderPageReactQueryOptions: UseQueryAssetOrderPageOptionsFn = (props) => ({
	queryFn: () => queryAssetOrderPage(props.firestoreQueryOptions),
	queryKey: getQueryAssetOrderPageReactQueryKey(props.firestoreQueryOptions),
	...(props.reactQueryOptions ?? {}),
});

export const useQueryAssetOrderPage = ({ firestoreQueryOptions, reactQueryOptions = {} }: UseQueryAssetOrderPageProps) => {
	return ReactQuery.useQuery(
		getQueryAssetOrderPageReactQueryOptions({
			firestoreQueryOptions,
			reactQueryOptions,
		}),
	);
};
