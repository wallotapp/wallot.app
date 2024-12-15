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
	NewsReport,
	CreateNewsReportParams,
	UpdateNewsReportParams,
} from '@wallot/js';

export type NewsReportPageQueryResponse =
	GeneralizedFirestoreCollectionPage<NewsReport>;

export type UseQueryNewsReportPageQueryKeyFn =
	GeneralizedUseQueryKeyFn<NewsReport>;

export type UseQueryNewsReportPageOptions =
	GeneralizedUseQueryPageOptions<NewsReport>;

export type UseQueryNewsReportPageProps =
	GeneralizedUseQueryPageProps<NewsReport>;

export type UseQueryNewsReportPageOptionsFn =
	GeneralizedUseQueryOptionsFn<NewsReport>;

export type UseQueryNewsReportPageObserver =
	GeneralizedUseQueryPageObserver<NewsReport>;

export type UseCreateNewsReportMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<
		NewsReport,
		CreateNewsReportParams
	>;
export type CreateNewsReportMutationData = GeneralizedResponse<NewsReport>;
export type CreateNewsReportMutationError = GeneralizedResponse<NewsReport>;
export type CreateNewsReportMutationParams =
	FirestoreDocumentCreateParams<CreateNewsReportParams>;

export type UseUpdateNewsReportMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<
		NewsReport,
		UpdateNewsReportParams
	>;
export type UpdateNewsReportMutationData = unknown;
export type UpdateNewsReportMutationError = GeneralizedResponse<NewsReport>;
export type UpdateNewsReportMutationParams =
	FirestoreDocumentUpdateParams<UpdateNewsReportParams>;
