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
	AlphaVantageCompany,
	CreateAlphaVantageCompanyParams,
	UpdateAlphaVantageCompanyParams,
} from '@wallot/js';

export type AlphaVantageCompanyPageQueryResponse =
	GeneralizedFirestoreCollectionPage<AlphaVantageCompany>;

export type UseQueryAlphaVantageCompanyPageQueryKeyFn =
	GeneralizedUseQueryKeyFn<AlphaVantageCompany>;

export type UseQueryAlphaVantageCompanyPageOptions =
	GeneralizedUseQueryPageOptions<AlphaVantageCompany>;

export type UseQueryAlphaVantageCompanyPageProps =
	GeneralizedUseQueryPageProps<AlphaVantageCompany>;

export type UseQueryAlphaVantageCompanyPageOptionsFn =
	GeneralizedUseQueryOptionsFn<AlphaVantageCompany>;

export type UseQueryAlphaVantageCompanyPageObserver =
	GeneralizedUseQueryPageObserver<AlphaVantageCompany>;

export type UseCreateAlphaVantageCompanyMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<
		AlphaVantageCompany,
		CreateAlphaVantageCompanyParams
	>;
export type CreateAlphaVantageCompanyMutationData =
	GeneralizedResponse<AlphaVantageCompany>;
export type CreateAlphaVantageCompanyMutationError =
	GeneralizedResponse<AlphaVantageCompany>;
export type CreateAlphaVantageCompanyMutationParams =
	FirestoreDocumentCreateParams<CreateAlphaVantageCompanyParams>;

export type UseUpdateAlphaVantageCompanyMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<
		AlphaVantageCompany,
		UpdateAlphaVantageCompanyParams
	>;
export type UpdateAlphaVantageCompanyMutationData = unknown;
export type UpdateAlphaVantageCompanyMutationError =
	GeneralizedResponse<AlphaVantageCompany>;
export type UpdateAlphaVantageCompanyMutationParams =
	FirestoreDocumentUpdateParams<UpdateAlphaVantageCompanyParams>;
