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
import { Stock, CreateStockParams, UpdateStockParams } from '@wallot/js';

export type StockPageQueryResponse = GeneralizedFirestoreCollectionPage<Stock>;

export type UseQueryStockPageQueryKeyFn = GeneralizedUseQueryKeyFn<Stock>;

export type UseQueryStockPageOptions = GeneralizedUseQueryPageOptions<Stock>;

export type UseQueryStockPageProps = GeneralizedUseQueryPageProps<Stock>;

export type UseQueryStockPageOptionsFn = GeneralizedUseQueryOptionsFn<Stock>;

export type UseQueryStockPageObserver = GeneralizedUseQueryPageObserver<Stock>;

export type UseCreateStockMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<Stock, CreateStockParams>;
export type CreateStockMutationData = GeneralizedResponse<Stock>;
export type CreateStockMutationError = GeneralizedResponse<Stock>;
export type CreateStockMutationParams =
	FirestoreDocumentCreateParams<CreateStockParams>;

export type UseUpdateStockMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<Stock, UpdateStockParams>;
export type UpdateStockMutationData = unknown;
export type UpdateStockMutationError = GeneralizedResponse<Stock>;
export type UpdateStockMutationParams =
	FirestoreDocumentUpdateParams<UpdateStockParams>;
