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
	AlpacaAccount,
	CreateAlpacaAccountParams,
	UpdateAlpacaAccountParams,
} from '@wallot/js';

export type AlpacaAccountPageQueryResponse =
	GeneralizedFirestoreCollectionPage<AlpacaAccount>;

export type UseQueryAlpacaAccountPageQueryKeyFn =
	GeneralizedUseQueryKeyFn<AlpacaAccount>;

export type UseQueryAlpacaAccountPageOptions =
	GeneralizedUseQueryPageOptions<AlpacaAccount>;

export type UseQueryAlpacaAccountPageProps =
	GeneralizedUseQueryPageProps<AlpacaAccount>;

export type UseQueryAlpacaAccountPageOptionsFn =
	GeneralizedUseQueryOptionsFn<AlpacaAccount>;

export type UseQueryAlpacaAccountPageObserver =
	GeneralizedUseQueryPageObserver<AlpacaAccount>;

export type UseCreateAlpacaAccountMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<
		AlpacaAccount,
		CreateAlpacaAccountParams
	>;
export type CreateAlpacaAccountMutationData =
	GeneralizedResponse<AlpacaAccount>;
export type CreateAlpacaAccountMutationError =
	GeneralizedResponse<AlpacaAccount>;
export type CreateAlpacaAccountMutationParams =
	FirestoreDocumentCreateParams<CreateAlpacaAccountParams>;

export type UseUpdateAlpacaAccountMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<
		AlpacaAccount,
		UpdateAlpacaAccountParams
	>;
export type UpdateAlpacaAccountMutationData = unknown;
export type UpdateAlpacaAccountMutationError =
	GeneralizedResponse<AlpacaAccount>;
export type UpdateAlpacaAccountMutationParams =
	FirestoreDocumentUpdateParams<UpdateAlpacaAccountParams>;
