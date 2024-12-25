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
import { Asset, CreateAssetParams, UpdateAssetParams } from '@wallot/js';

export type AssetPageQueryResponse = GeneralizedFirestoreCollectionPage<Asset>;

export type UseQueryAssetPageQueryKeyFn = GeneralizedUseQueryKeyFn<Asset>;

export type UseQueryAssetPageOptions = GeneralizedUseQueryPageOptions<Asset>;

export type UseQueryAssetPageProps = GeneralizedUseQueryPageProps<Asset>;

export type UseQueryAssetPageOptionsFn = GeneralizedUseQueryOptionsFn<Asset>;

export type UseQueryAssetPageObserver = GeneralizedUseQueryPageObserver<Asset>;

export type UseCreateAssetMutationOptions = GeneralizedUseCreateDocumentsMutationOptions<Asset, CreateAssetParams>;
export type CreateAssetMutationData = Asset[];
export type CreateAssetMutationError = GeneralizedError;
export type CreateAssetMutationParams = FirestoreDocumentCreateParams<CreateAssetParams>;

export type UseUpdateAssetMutationOptions = GeneralizedUseUpdateDocumentsMutationOptions<UpdateAssetParams>;
export type UpdateAssetMutationData = unknown;
export type UpdateAssetMutationError = GeneralizedError;
export type UpdateAssetMutationParams = FirestoreDocumentUpdateParams<UpdateAssetParams>;
