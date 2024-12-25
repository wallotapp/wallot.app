import { GeneralizedError } from 'ergonomic';
import {
	GeneralizedUseQueryKeyFn,
	GeneralizedUseQueryOptionsFn,
	GeneralizedUseQueryPageOptions,
	GeneralizedUseQueryPageProps,
	GeneralizedUseQueryPageObserver,
	GeneralizedUseCreateDocumentsMutationOptions,
	GeneralizedUseUpdateDocumentsMutationOptions,
} from 'ergonomic-react/src/lib/tanstackQuery';
import { FirestoreDocumentCreateParams, FirestoreDocumentUpdateParams, GeneralizedFirestoreCollectionPage } from 'ergonomic-react/src/features/data';
import { AssetPrice, CreateAssetPriceParams, UpdateAssetPriceParams } from '@wallot/js';

export type AssetPricePageQueryResponse = GeneralizedFirestoreCollectionPage<AssetPrice>;

export type UseQueryAssetPricePageQueryKeyFn = GeneralizedUseQueryKeyFn<AssetPrice>;

export type UseQueryAssetPricePageOptions = GeneralizedUseQueryPageOptions<AssetPrice>;

export type UseQueryAssetPricePageProps = GeneralizedUseQueryPageProps<AssetPrice>;

export type UseQueryAssetPricePageOptionsFn = GeneralizedUseQueryOptionsFn<AssetPrice>;

export type UseQueryAssetPricePageObserver = GeneralizedUseQueryPageObserver<AssetPrice>;

export type UseCreateAssetPriceMutationOptions = GeneralizedUseCreateDocumentsMutationOptions<AssetPrice, CreateAssetPriceParams>;
export type CreateAssetPriceMutationData = AssetPrice[];
export type CreateAssetPriceMutationError = GeneralizedError;
export type CreateAssetPriceMutationParams = FirestoreDocumentCreateParams<CreateAssetPriceParams>;

export type UseUpdateAssetPriceMutationOptions = GeneralizedUseUpdateDocumentsMutationOptions<UpdateAssetPriceParams>;
export type UpdateAssetPriceMutationData = unknown;
export type UpdateAssetPriceMutationError = GeneralizedError;
export type UpdateAssetPriceMutationParams = FirestoreDocumentUpdateParams<UpdateAssetPriceParams>;
