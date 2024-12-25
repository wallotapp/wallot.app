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
import { User, CreateUserParams, UpdateUserParams } from '@wallot/js';

export type UserPageQueryResponse = GeneralizedFirestoreCollectionPage<User>;

export type UseQueryUserPageQueryKeyFn = GeneralizedUseQueryKeyFn<User>;

export type UseQueryUserPageOptions = GeneralizedUseQueryPageOptions<User>;

export type UseQueryUserPageProps = GeneralizedUseQueryPageProps<User>;

export type UseQueryUserPageOptionsFn = GeneralizedUseQueryOptionsFn<User>;

export type UseQueryUserPageObserver = GeneralizedUseQueryPageObserver<User>;

export type UseCreateUserMutationOptions = GeneralizedUseCreateDocumentsMutationOptions<User, CreateUserParams>;
export type CreateUserMutationData = User[];
export type CreateUserMutationError = GeneralizedError;
export type CreateUserMutationParams = FirestoreDocumentCreateParams<CreateUserParams>;

export type UseUpdateUserMutationOptions = GeneralizedUseUpdateDocumentsMutationOptions<UpdateUserParams>;
export type UpdateUserMutationData = unknown;
export type UpdateUserMutationError = GeneralizedError;
export type UpdateUserMutationParams = FirestoreDocumentUpdateParams<UpdateUserParams>;
