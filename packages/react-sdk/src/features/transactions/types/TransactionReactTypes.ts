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
	Transaction,
	CreateTransactionParams,
	UpdateTransactionParams,
} from '@wallot/js';

export type TransactionPageQueryResponse =
	GeneralizedFirestoreCollectionPage<Transaction>;

export type UseQueryTransactionPageQueryKeyFn =
	GeneralizedUseQueryKeyFn<Transaction>;

export type UseQueryTransactionPageOptions =
	GeneralizedUseQueryPageOptions<Transaction>;

export type UseQueryTransactionPageProps =
	GeneralizedUseQueryPageProps<Transaction>;

export type UseQueryTransactionPageOptionsFn =
	GeneralizedUseQueryOptionsFn<Transaction>;

export type UseQueryTransactionPageObserver =
	GeneralizedUseQueryPageObserver<Transaction>;

export type UseCreateTransactionMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<
		Transaction,
		CreateTransactionParams
	>;
export type CreateTransactionMutationData = GeneralizedResponse<Transaction>;
export type CreateTransactionMutationError = GeneralizedResponse<Transaction>;
export type CreateTransactionMutationParams =
	FirestoreDocumentCreateParams<CreateTransactionParams>;

export type UseUpdateTransactionMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<
		Transaction,
		UpdateTransactionParams
	>;
export type UpdateTransactionMutationData = unknown;
export type UpdateTransactionMutationError = GeneralizedResponse<Transaction>;
export type UpdateTransactionMutationParams =
	FirestoreDocumentUpdateParams<UpdateTransactionParams>;
