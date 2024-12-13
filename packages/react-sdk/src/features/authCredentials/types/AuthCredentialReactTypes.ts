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
	AuthCredential,
	CreateAuthCredentialParams,
	UpdateAuthCredentialParams,
} from '@wallot/js';

export type AuthCredentialPageQueryResponse =
	GeneralizedFirestoreCollectionPage<AuthCredential>;

export type UseQueryAuthCredentialPageQueryKeyFn =
	GeneralizedUseQueryKeyFn<AuthCredential>;

export type UseQueryAuthCredentialPageOptions =
	GeneralizedUseQueryPageOptions<AuthCredential>;

export type UseQueryAuthCredentialPageProps =
	GeneralizedUseQueryPageProps<AuthCredential>;

export type UseQueryAuthCredentialPageOptionsFn =
	GeneralizedUseQueryOptionsFn<AuthCredential>;

export type UseQueryAuthCredentialPageObserver =
	GeneralizedUseQueryPageObserver<AuthCredential>;

export type UseCreateAuthCredentialMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<
		AuthCredential,
		CreateAuthCredentialParams
	>;
export type CreateAuthCredentialMutationData =
	GeneralizedResponse<AuthCredential>;
export type CreateAuthCredentialMutationError =
	GeneralizedResponse<AuthCredential>;
export type CreateAuthCredentialMutationParams =
	FirestoreDocumentCreateParams<CreateAuthCredentialParams>;

export type UseUpdateAuthCredentialMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<
		AuthCredential,
		UpdateAuthCredentialParams
	>;
export type UpdateAuthCredentialMutationData = unknown;
export type UpdateAuthCredentialMutationError =
	GeneralizedResponse<AuthCredential>;
export type UpdateAuthCredentialMutationParams =
	FirestoreDocumentUpdateParams<UpdateAuthCredentialParams>;
