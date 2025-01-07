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
	IdentityVerificationDocument,
	CreateIdentityVerificationDocumentParams,
	UpdateIdentityVerificationDocumentParams,
} from '@wallot/js';

export type IdentityVerificationDocumentPageQueryResponse =
	GeneralizedFirestoreCollectionPage<IdentityVerificationDocument>;

export type UseQueryIdentityVerificationDocumentPageQueryKeyFn =
	GeneralizedUseQueryKeyFn<IdentityVerificationDocument>;

export type UseQueryIdentityVerificationDocumentPageOptions =
	GeneralizedUseQueryPageOptions<IdentityVerificationDocument>;

export type UseQueryIdentityVerificationDocumentPageProps =
	GeneralizedUseQueryPageProps<IdentityVerificationDocument>;

export type UseQueryIdentityVerificationDocumentPageOptionsFn =
	GeneralizedUseQueryOptionsFn<IdentityVerificationDocument>;

export type UseQueryIdentityVerificationDocumentPageObserver =
	GeneralizedUseQueryPageObserver<IdentityVerificationDocument>;

export type UseCreateIdentityVerificationDocumentMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<
		IdentityVerificationDocument,
		CreateIdentityVerificationDocumentParams
	>;
export type CreateIdentityVerificationDocumentMutationData =
	IdentityVerificationDocument[];
export type CreateIdentityVerificationDocumentMutationError = GeneralizedError;
export type CreateIdentityVerificationDocumentMutationParams =
	FirestoreDocumentCreateParams<CreateIdentityVerificationDocumentParams>;

export type UseUpdateIdentityVerificationDocumentMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<UpdateIdentityVerificationDocumentParams>;
export type UpdateIdentityVerificationDocumentMutationData = unknown;
export type UpdateIdentityVerificationDocumentMutationError = GeneralizedError;
export type UpdateIdentityVerificationDocumentMutationParams =
	FirestoreDocumentUpdateParams<UpdateIdentityVerificationDocumentParams>;
