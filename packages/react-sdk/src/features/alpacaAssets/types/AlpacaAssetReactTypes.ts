import { GeneralizedResponse } from 'ergonomic';
import {
	GeneralizedUseQueryKeyFn,
	GeneralizedUseQueryOptionsFn,
	GeneralizedUseQueryPageOptions,
	GeneralizedUseQueryPageProps,
	GeneralizedUseQueryPageObserver,
	GeneralizedUseCreateDocumentsMutationOptions,
	GeneralizedUseUpdateDocumentsMutationOptions,
} from 'ergonomic-react/src/lib/tanstackQuery';
import {
	FirestoreDocumentCreateParams,
	FirestoreDocumentUpdateParams,
	GeneralizedFirestoreCollectionPage,
} from 'ergonomic-react/src/features/data';
import {
	AlpacaAsset,
	CreateAlpacaAssetParams,
	UpdateAlpacaAssetParams,
} from '@wallot/js';

export type AlpacaAssetPageQueryResponse =
	GeneralizedFirestoreCollectionPage<AlpacaAsset>;

export type UseQueryAlpacaAssetPageQueryKeyFn =
	GeneralizedUseQueryKeyFn<AlpacaAsset>;

export type UseQueryAlpacaAssetPageOptions =
	GeneralizedUseQueryPageOptions<AlpacaAsset>;

export type UseQueryAlpacaAssetPageProps =
	GeneralizedUseQueryPageProps<AlpacaAsset>;

export type UseQueryAlpacaAssetPageOptionsFn =
	GeneralizedUseQueryOptionsFn<AlpacaAsset>;

export type UseQueryAlpacaAssetPageObserver =
	GeneralizedUseQueryPageObserver<AlpacaAsset>;

export type UseCreateAlpacaAssetMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<
		AlpacaAsset,
		CreateAlpacaAssetParams
	>;
export type CreateAlpacaAssetMutationData = GeneralizedResponse<AlpacaAsset>;
export type CreateAlpacaAssetMutationError = GeneralizedResponse<AlpacaAsset>;
export type CreateAlpacaAssetMutationParams =
	FirestoreDocumentCreateParams<CreateAlpacaAssetParams>;

export type UseUpdateAlpacaAssetMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<
		AlpacaAsset,
		UpdateAlpacaAssetParams
	>;
export type UpdateAlpacaAssetMutationData = unknown;
export type UpdateAlpacaAssetMutationError = GeneralizedResponse<AlpacaAsset>;
export type UpdateAlpacaAssetMutationParams =
	FirestoreDocumentUpdateParams<UpdateAlpacaAssetParams>;
