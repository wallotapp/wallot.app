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
	AchTransfer,
	CreateAchTransferParams,
	UpdateAchTransferParams,
} from '@wallot/js';

export type AchTransferPageQueryResponse =
	GeneralizedFirestoreCollectionPage<AchTransfer>;

export type UseQueryAchTransferPageQueryKeyFn =
	GeneralizedUseQueryKeyFn<AchTransfer>;

export type UseQueryAchTransferPageOptions =
	GeneralizedUseQueryPageOptions<AchTransfer>;

export type UseQueryAchTransferPageProps =
	GeneralizedUseQueryPageProps<AchTransfer>;

export type UseQueryAchTransferPageOptionsFn =
	GeneralizedUseQueryOptionsFn<AchTransfer>;

export type UseQueryAchTransferPageObserver =
	GeneralizedUseQueryPageObserver<AchTransfer>;

export type UseCreateAchTransferMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<
		AchTransfer,
		CreateAchTransferParams
	>;
export type CreateAchTransferMutationData = AchTransfer[];
export type CreateAchTransferMutationError = GeneralizedError;
export type CreateAchTransferMutationParams =
	FirestoreDocumentCreateParams<CreateAchTransferParams>;

export type UseUpdateAchTransferMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<UpdateAchTransferParams>;
export type UpdateAchTransferMutationData = unknown;
export type UpdateAchTransferMutationError = GeneralizedError;
export type UpdateAchTransferMutationParams =
	FirestoreDocumentUpdateParams<UpdateAchTransferParams>;
