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
import { AssetOrder, CreateAssetOrderParams, UpdateAssetOrderParams } from '@wallot/js';

export type AssetOrderPageQueryResponse = GeneralizedFirestoreCollectionPage<AssetOrder>;

export type UseQueryAssetOrderPageQueryKeyFn = GeneralizedUseQueryKeyFn<AssetOrder>;

export type UseQueryAssetOrderPageOptions = GeneralizedUseQueryPageOptions<AssetOrder>;

export type UseQueryAssetOrderPageProps = GeneralizedUseQueryPageProps<AssetOrder>;

export type UseQueryAssetOrderPageOptionsFn = GeneralizedUseQueryOptionsFn<AssetOrder>;

export type UseQueryAssetOrderPageObserver = GeneralizedUseQueryPageObserver<AssetOrder>;

export type UseCreateAssetOrderMutationOptions = GeneralizedUseCreateDocumentsMutationOptions<AssetOrder, CreateAssetOrderParams>;
export type CreateAssetOrderMutationData = AssetOrder[];
export type CreateAssetOrderMutationError = GeneralizedError;
export type CreateAssetOrderMutationParams = FirestoreDocumentCreateParams<CreateAssetOrderParams>;

export type UseUpdateAssetOrderMutationOptions = GeneralizedUseUpdateDocumentsMutationOptions<UpdateAssetOrderParams>;
export type UpdateAssetOrderMutationData = unknown;
export type UpdateAssetOrderMutationError = GeneralizedError;
export type UpdateAssetOrderMutationParams = FirestoreDocumentUpdateParams<UpdateAssetOrderParams>;
