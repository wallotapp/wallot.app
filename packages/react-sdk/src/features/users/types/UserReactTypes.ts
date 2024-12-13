import {
	GeneralizedUseQueryKeyFn,
	GeneralizedUseQueryOptionsFn,
	GeneralizedUseQueryPageOptions,
	GeneralizedUseQueryPageProps,
	GeneralizedUseQueryPageObserver,
	GeneralizedUseCreateDocumentsMutationOptions,
	GeneralizedUseUpdateDocumentsMutationOptions,
} from 'ergonomic-react/src/lib/tanstackQuery';
import { GeneralizedFirestoreCollectionPage } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreCollectionPageQuery';
import { User, CreateUserParams, UpdateUserParams } from '@wallot/js';

export type UserPageQueryResponse = GeneralizedFirestoreCollectionPage<User>;

export type UseQueryUserPageQueryKeyFn = GeneralizedUseQueryKeyFn<User>;

export type UseQueryUserPageOptions = GeneralizedUseQueryPageOptions<User>;

export type UseQueryUserPageProps = GeneralizedUseQueryPageProps<User>;

export type UseQueryUserPageOptionsFn = GeneralizedUseQueryOptionsFn<User>;

export type UseQueryUserPageObserver = GeneralizedUseQueryPageObserver<User>;

export type UseCreateUserMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<User, CreateUserParams>;
export type CreateUserMutationData = GeneralizedResponse<User>;
export type CreateUserMutationError = GeneralizedResponse<User>;
export type CreateUserMutationParams =
	FirestoreDocumentCreateParams<CreateUserParams>;

export type UseUpdateUserMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<User, UpdateUserParams>;
export type UpdateUserMutationData = unknown;
export type UpdateUserMutationError = GeneralizedResponse<User>;
export type UpdateUserMutationParams =
	FirestoreDocumentUpdateParams<UpdateUserParams>;
