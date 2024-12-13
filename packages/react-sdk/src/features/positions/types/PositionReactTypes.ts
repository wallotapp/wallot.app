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
	Position,
	CreatePositionParams,
	UpdatePositionParams,
} from '@wallot/js';

export type PositionPageQueryResponse =
	GeneralizedFirestoreCollectionPage<Position>;

export type UseQueryPositionPageQueryKeyFn = GeneralizedUseQueryKeyFn<Position>;

export type UseQueryPositionPageOptions =
	GeneralizedUseQueryPageOptions<Position>;

export type UseQueryPositionPageProps = GeneralizedUseQueryPageProps<Position>;

export type UseQueryPositionPageOptionsFn =
	GeneralizedUseQueryOptionsFn<Position>;

export type UseQueryPositionPageObserver =
	GeneralizedUseQueryPageObserver<Position>;

export type UseCreatePositionMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<Position, CreatePositionParams>;
export type CreatePositionMutationData = GeneralizedResponse<Position>;
export type CreatePositionMutationError = GeneralizedResponse<Position>;
export type CreatePositionMutationParams =
	FirestoreDocumentCreateParams<CreatePositionParams>;

export type UseUpdatePositionMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<Position, UpdatePositionParams>;
export type UpdatePositionMutationData = unknown;
export type UpdatePositionMutationError = GeneralizedResponse<Position>;
export type UpdatePositionMutationParams =
	FirestoreDocumentUpdateParams<UpdatePositionParams>;
