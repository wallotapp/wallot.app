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
	UserPersona,
	CreateUserPersonaParams,
	UpdateUserPersonaParams,
} from '@wallot/js';

export type UserPersonaPageQueryResponse =
	GeneralizedFirestoreCollectionPage<UserPersona>;

export type UseQueryUserPersonaPageQueryKeyFn =
	GeneralizedUseQueryKeyFn<UserPersona>;

export type UseQueryUserPersonaPageOptions =
	GeneralizedUseQueryPageOptions<UserPersona>;

export type UseQueryUserPersonaPageProps =
	GeneralizedUseQueryPageProps<UserPersona>;

export type UseQueryUserPersonaPageOptionsFn =
	GeneralizedUseQueryOptionsFn<UserPersona>;

export type UseQueryUserPersonaPageObserver =
	GeneralizedUseQueryPageObserver<UserPersona>;

export type UseCreateUserPersonaMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<
		UserPersona,
		CreateUserPersonaParams
	>;
export type CreateUserPersonaMutationData = GeneralizedResponse<UserPersona>;
export type CreateUserPersonaMutationError = GeneralizedResponse<UserPersona>;
export type CreateUserPersonaMutationParams =
	FirestoreDocumentCreateParams<CreateUserPersonaParams>;

export type UseUpdateUserPersonaMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<
		UserPersona,
		UpdateUserPersonaParams
	>;
export type UpdateUserPersonaMutationData = unknown;
export type UpdateUserPersonaMutationError = GeneralizedResponse<UserPersona>;
export type UpdateUserPersonaMutationParams =
	FirestoreDocumentUpdateParams<UpdateUserPersonaParams>;
