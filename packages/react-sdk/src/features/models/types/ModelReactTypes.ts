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
import { Model, CreateModelParams, UpdateModelParams } from '@wallot/js';

export type ModelPageQueryResponse = GeneralizedFirestoreCollectionPage<Model>;

export type UseQueryModelPageQueryKeyFn = GeneralizedUseQueryKeyFn<Model>;

export type UseQueryModelPageOptions = GeneralizedUseQueryPageOptions<Model>;

export type UseQueryModelPageProps = GeneralizedUseQueryPageProps<Model>;

export type UseQueryModelPageOptionsFn = GeneralizedUseQueryOptionsFn<Model>;

export type UseQueryModelPageObserver = GeneralizedUseQueryPageObserver<Model>;

export type UseCreateModelMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<Model, CreateModelParams>;
export type CreateModelMutationData = GeneralizedResponse<Model>;
export type CreateModelMutationError = GeneralizedResponse<Model>;
export type CreateModelMutationParams =
	FirestoreDocumentCreateParams<CreateModelParams>;

export type UseUpdateModelMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<Model, UpdateModelParams>;
export type UpdateModelMutationData = unknown;
export type UpdateModelMutationError = GeneralizedResponse<Model>;
export type UpdateModelMutationParams =
	FirestoreDocumentUpdateParams<UpdateModelParams>;
