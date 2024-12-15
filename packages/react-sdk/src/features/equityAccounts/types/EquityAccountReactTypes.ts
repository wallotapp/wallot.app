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
	EquityAccount,
	CreateEquityAccountParams,
	UpdateEquityAccountParams,
} from '@wallot/js';

export type EquityAccountPageQueryResponse =
	GeneralizedFirestoreCollectionPage<EquityAccount>;

export type UseQueryEquityAccountPageQueryKeyFn =
	GeneralizedUseQueryKeyFn<EquityAccount>;

export type UseQueryEquityAccountPageOptions =
	GeneralizedUseQueryPageOptions<EquityAccount>;

export type UseQueryEquityAccountPageProps =
	GeneralizedUseQueryPageProps<EquityAccount>;

export type UseQueryEquityAccountPageOptionsFn =
	GeneralizedUseQueryOptionsFn<EquityAccount>;

export type UseQueryEquityAccountPageObserver =
	GeneralizedUseQueryPageObserver<EquityAccount>;

export type UseCreateEquityAccountMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<
		EquityAccount,
		CreateEquityAccountParams
	>;
export type CreateEquityAccountMutationData =
	GeneralizedResponse<EquityAccount>;
export type CreateEquityAccountMutationError =
	GeneralizedResponse<EquityAccount>;
export type CreateEquityAccountMutationParams =
	FirestoreDocumentCreateParams<CreateEquityAccountParams>;

export type UseUpdateEquityAccountMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<
		EquityAccount,
		UpdateEquityAccountParams
	>;
export type UpdateEquityAccountMutationData = unknown;
export type UpdateEquityAccountMutationError =
	GeneralizedResponse<EquityAccount>;
export type UpdateEquityAccountMutationParams =
	FirestoreDocumentUpdateParams<UpdateEquityAccountParams>;
