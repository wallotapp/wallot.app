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
	ScholarshipApplication,
	CreateScholarshipApplicationParams,
	UpdateScholarshipApplicationParams,
} from '@wallot/js';

export type ScholarshipApplicationPageQueryResponse =
	GeneralizedFirestoreCollectionPage<ScholarshipApplication>;

export type UseQueryScholarshipApplicationPageQueryKeyFn =
	GeneralizedUseQueryKeyFn<ScholarshipApplication>;

export type UseQueryScholarshipApplicationPageOptions =
	GeneralizedUseQueryPageOptions<ScholarshipApplication>;

export type UseQueryScholarshipApplicationPageProps =
	GeneralizedUseQueryPageProps<ScholarshipApplication>;

export type UseQueryScholarshipApplicationPageOptionsFn =
	GeneralizedUseQueryOptionsFn<ScholarshipApplication>;

export type UseQueryScholarshipApplicationPageObserver =
	GeneralizedUseQueryPageObserver<ScholarshipApplication>;

export type UseCreateScholarshipApplicationMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<
		ScholarshipApplication,
		CreateScholarshipApplicationParams
	>;
export type CreateScholarshipApplicationMutationData = ScholarshipApplication[];
export type CreateScholarshipApplicationMutationError = GeneralizedError;
export type CreateScholarshipApplicationMutationParams =
	FirestoreDocumentCreateParams<CreateScholarshipApplicationParams>;

export type UseUpdateScholarshipApplicationMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<UpdateScholarshipApplicationParams>;
export type UpdateScholarshipApplicationMutationData = unknown;
export type UpdateScholarshipApplicationMutationError = GeneralizedError;
export type UpdateScholarshipApplicationMutationParams =
	FirestoreDocumentUpdateParams<UpdateScholarshipApplicationParams>;
