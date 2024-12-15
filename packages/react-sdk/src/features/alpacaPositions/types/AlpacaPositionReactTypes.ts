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
	AlpacaPosition,
	CreateAlpacaPositionParams,
	UpdateAlpacaPositionParams,
} from '@wallot/js';

export type AlpacaPositionPageQueryResponse =
	GeneralizedFirestoreCollectionPage<AlpacaPosition>;

export type UseQueryAlpacaPositionPageQueryKeyFn =
	GeneralizedUseQueryKeyFn<AlpacaPosition>;

export type UseQueryAlpacaPositionPageOptions =
	GeneralizedUseQueryPageOptions<AlpacaPosition>;

export type UseQueryAlpacaPositionPageProps =
	GeneralizedUseQueryPageProps<AlpacaPosition>;

export type UseQueryAlpacaPositionPageOptionsFn =
	GeneralizedUseQueryOptionsFn<AlpacaPosition>;

export type UseQueryAlpacaPositionPageObserver =
	GeneralizedUseQueryPageObserver<AlpacaPosition>;

export type UseCreateAlpacaPositionMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<
		AlpacaPosition,
		CreateAlpacaPositionParams
	>;
export type CreateAlpacaPositionMutationData =
	GeneralizedResponse<AlpacaPosition>;
export type CreateAlpacaPositionMutationError =
	GeneralizedResponse<AlpacaPosition>;
export type CreateAlpacaPositionMutationParams =
	FirestoreDocumentCreateParams<CreateAlpacaPositionParams>;

export type UseUpdateAlpacaPositionMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<
		AlpacaPosition,
		UpdateAlpacaPositionParams
	>;
export type UpdateAlpacaPositionMutationData = unknown;
export type UpdateAlpacaPositionMutationError =
	GeneralizedResponse<AlpacaPosition>;
export type UpdateAlpacaPositionMutationParams =
	FirestoreDocumentUpdateParams<UpdateAlpacaPositionParams>;
