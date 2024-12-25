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
import { License, CreateLicenseParams, UpdateLicenseParams } from '@wallot/js';

export type LicensePageQueryResponse =
	GeneralizedFirestoreCollectionPage<License>;

export type UseQueryLicensePageQueryKeyFn = GeneralizedUseQueryKeyFn<License>;

export type UseQueryLicensePageOptions =
	GeneralizedUseQueryPageOptions<License>;

export type UseQueryLicensePageProps = GeneralizedUseQueryPageProps<License>;

export type UseQueryLicensePageOptionsFn =
	GeneralizedUseQueryOptionsFn<License>;

export type UseQueryLicensePageObserver =
	GeneralizedUseQueryPageObserver<License>;

export type UseCreateLicenseMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<License, CreateLicenseParams>;
export type CreateLicenseMutationData = License[];
export type CreateLicenseMutationError = GeneralizedError;
export type CreateLicenseMutationParams =
	FirestoreDocumentCreateParams<CreateLicenseParams>;

export type UseUpdateLicenseMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<UpdateLicenseParams>;
export type UpdateLicenseMutationData = unknown;
export type UpdateLicenseMutationError = GeneralizedError;
export type UpdateLicenseMutationParams =
	FirestoreDocumentUpdateParams<UpdateLicenseParams>;
