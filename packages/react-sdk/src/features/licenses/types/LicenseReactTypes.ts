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
import {
	License,
	CreateLicenseParams,
	UpdateLicenseParams,
} from '@wallot/js';

export type LicensePageQueryResponse =
	GeneralizedFirestoreCollectionPage<License>;

export type UseQueryLicensePageQueryKeyFn = GeneralizedUseQueryKeyFn<License>;

export type UseQueryLicensePageOptions = GeneralizedUseQueryPageOptions<License>;

export type UseQueryLicensePageProps = GeneralizedUseQueryPageProps<License>;

export type UseQueryLicensePageOptionsFn = GeneralizedUseQueryOptionsFn<License>;

export type UseQueryLicensePageObserver =
	GeneralizedUseQueryPageObserver<License>;

export type UseCreateLicenseMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<
		License,
		CreateLicenseParams
	>;
export type CreateLicenseMutationData = GeneralizedResponse<License>;
export type CreateLicenseMutationError = GeneralizedResponse<License>;
export type CreateLicenseMutationParams =
	FirestoreDocumentCreateParams<CreateLicenseParams>;

export type UseUpdateLicenseMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<
		License,
		UpdateLicenseParams
	>;
export type UpdateLicenseMutationData = unknown;
export type UpdateLicenseMutationError = GeneralizedResponse<License>;
export type UpdateLicenseMutationParams =
	FirestoreDocumentUpdateParams<UpdateLicenseParams>;
