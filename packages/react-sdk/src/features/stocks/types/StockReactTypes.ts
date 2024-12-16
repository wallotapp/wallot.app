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
import { Stock, CreateStockParams, UpdateStockParams } from '@wallot/js';

export type StockPageQueryResponse = GeneralizedFirestoreCollectionPage<Stock>;

export type UseQueryStockPageQueryKeyFn = GeneralizedUseQueryKeyFn<Stock>;

export type UseQueryStockPageOptions = GeneralizedUseQueryPageOptions<Stock>;

export type UseQueryStockPageProps = GeneralizedUseQueryPageProps<Stock>;

export type UseQueryStockPageOptionsFn = GeneralizedUseQueryOptionsFn<Stock>;

export type UseQueryStockPageObserver = GeneralizedUseQueryPageObserver<Stock>;

export type UseCreateStockMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<Stock, CreateStockParams>;
export type CreateStockMutationData = Stock[];
export type CreateStockMutationError = GeneralizedError;
export type CreateStockMutationParams =
	FirestoreDocumentCreateParams<CreateStockParams>;

export type UseUpdateStockMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<UpdateStockParams>;
export type UpdateStockMutationData = unknown;
export type UpdateStockMutationError = GeneralizedError;
export type UpdateStockMutationParams =
	FirestoreDocumentUpdateParams<UpdateStockParams>;
