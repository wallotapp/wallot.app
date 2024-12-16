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
import {
	FirestoreDocumentCreateParams,
	FirestoreDocumentUpdateParams,
	GeneralizedFirestoreCollectionPage,
} from 'ergonomic-react/src/features/data';
import {
	AlpacaAchTransfer,
	CreateAlpacaAchTransferParams,
	UpdateAlpacaAchTransferParams,
} from '@wallot/js';

export type AlpacaAchTransferPageQueryResponse =
	GeneralizedFirestoreCollectionPage<AlpacaAchTransfer>;

export type UseQueryAlpacaAchTransferPageQueryKeyFn =
	GeneralizedUseQueryKeyFn<AlpacaAchTransfer>;

export type UseQueryAlpacaAchTransferPageOptions =
	GeneralizedUseQueryPageOptions<AlpacaAchTransfer>;

export type UseQueryAlpacaAchTransferPageProps =
	GeneralizedUseQueryPageProps<AlpacaAchTransfer>;

export type UseQueryAlpacaAchTransferPageOptionsFn =
	GeneralizedUseQueryOptionsFn<AlpacaAchTransfer>;

export type UseQueryAlpacaAchTransferPageObserver =
	GeneralizedUseQueryPageObserver<AlpacaAchTransfer>;

export type UseCreateAlpacaAchTransferMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<
		AlpacaAchTransfer,
		CreateAlpacaAchTransferParams
	>;
export type CreateAlpacaAchTransferMutationData = AlpacaAchTransfer[];
export type CreateAlpacaAchTransferMutationError = GeneralizedError;
export type CreateAlpacaAchTransferMutationParams =
	FirestoreDocumentCreateParams<CreateAlpacaAchTransferParams>;

export type UseUpdateAlpacaAchTransferMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<UpdateAlpacaAchTransferParams>;
export type UpdateAlpacaAchTransferMutationData = unknown;
export type UpdateAlpacaAchTransferMutationError = GeneralizedError;
export type UpdateAlpacaAchTransferMutationParams =
	FirestoreDocumentUpdateParams<UpdateAlpacaAchTransferParams>;
