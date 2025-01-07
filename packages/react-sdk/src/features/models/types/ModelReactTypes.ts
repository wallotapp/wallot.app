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
import { Model, CreateModelParams, UpdateModelParams } from '@wallot/js';

export type ModelPageQueryResponse = GeneralizedFirestoreCollectionPage<Model>;

export type UseQueryModelPageQueryKeyFn = GeneralizedUseQueryKeyFn<Model>;

export type UseQueryModelPageOptions = GeneralizedUseQueryPageOptions<Model>;

export type UseQueryModelPageProps = GeneralizedUseQueryPageProps<Model>;

export type UseQueryModelPageOptionsFn = GeneralizedUseQueryOptionsFn<Model>;

export type UseQueryModelPageObserver = GeneralizedUseQueryPageObserver<Model>;

export type UseCreateModelMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<Model, CreateModelParams>;
export type CreateModelMutationData = Model[];
export type CreateModelMutationError = GeneralizedError;
export type CreateModelMutationParams =
	FirestoreDocumentCreateParams<CreateModelParams>;

export type UseUpdateModelMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<UpdateModelParams>;
export type UpdateModelMutationData = unknown;
export type UpdateModelMutationError = GeneralizedError;
export type UpdateModelMutationParams =
	FirestoreDocumentUpdateParams<UpdateModelParams>;
