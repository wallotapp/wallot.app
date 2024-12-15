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
	StripeTransaction,
	CreateStripeTransactionParams,
	UpdateStripeTransactionParams,
} from '@wallot/js';

export type StripeTransactionPageQueryResponse =
	GeneralizedFirestoreCollectionPage<StripeTransaction>;

export type UseQueryStripeTransactionPageQueryKeyFn =
	GeneralizedUseQueryKeyFn<StripeTransaction>;

export type UseQueryStripeTransactionPageOptions =
	GeneralizedUseQueryPageOptions<StripeTransaction>;

export type UseQueryStripeTransactionPageProps =
	GeneralizedUseQueryPageProps<StripeTransaction>;

export type UseQueryStripeTransactionPageOptionsFn =
	GeneralizedUseQueryOptionsFn<StripeTransaction>;

export type UseQueryStripeTransactionPageObserver =
	GeneralizedUseQueryPageObserver<StripeTransaction>;

export type UseCreateStripeTransactionMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<
		StripeTransaction,
		CreateStripeTransactionParams
	>;
export type CreateStripeTransactionMutationData =
	GeneralizedResponse<StripeTransaction>;
export type CreateStripeTransactionMutationError =
	GeneralizedResponse<StripeTransaction>;
export type CreateStripeTransactionMutationParams =
	FirestoreDocumentCreateParams<CreateStripeTransactionParams>;

export type UseUpdateStripeTransactionMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<
		StripeTransaction,
		UpdateStripeTransactionParams
	>;
export type UpdateStripeTransactionMutationData = unknown;
export type UpdateStripeTransactionMutationError =
	GeneralizedResponse<StripeTransaction>;
export type UpdateStripeTransactionMutationParams =
	FirestoreDocumentUpdateParams<UpdateStripeTransactionParams>;
