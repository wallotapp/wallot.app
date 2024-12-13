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
	FundingAccount,
	CreateFundingAccountParams,
	UpdateFundingAccountParams,
} from '@wallot/js';

export type FundingAccountPageQueryResponse =
	GeneralizedFirestoreCollectionPage<FundingAccount>;

export type UseQueryFundingAccountPageQueryKeyFn = GeneralizedUseQueryKeyFn<FundingAccount>;

export type UseQueryFundingAccountPageOptions = GeneralizedUseQueryPageOptions<FundingAccount>;

export type UseQueryFundingAccountPageProps = GeneralizedUseQueryPageProps<FundingAccount>;

export type UseQueryFundingAccountPageOptionsFn = GeneralizedUseQueryOptionsFn<FundingAccount>;

export type UseQueryFundingAccountPageObserver =
	GeneralizedUseQueryPageObserver<FundingAccount>;

export type UseCreateFundingAccountMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<
		FundingAccount,
		CreateFundingAccountParams
	>;
export type CreateFundingAccountMutationData = GeneralizedResponse<FundingAccount>;
export type CreateFundingAccountMutationError = GeneralizedResponse<FundingAccount>;
export type CreateFundingAccountMutationParams =
	FirestoreDocumentCreateParams<CreateFundingAccountParams>;

export type UseUpdateFundingAccountMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<
		FundingAccount,
		UpdateFundingAccountParams
	>;
export type UpdateFundingAccountMutationData = unknown;
export type UpdateFundingAccountMutationError = GeneralizedResponse<FundingAccount>;
export type UpdateFundingAccountMutationParams =
	FirestoreDocumentUpdateParams<UpdateFundingAccountParams>;
