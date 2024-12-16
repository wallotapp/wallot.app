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
	StockOrder,
	CreateStockOrderParams,
	UpdateStockOrderParams,
} from '@wallot/js';

export type StockOrderPageQueryResponse =
	GeneralizedFirestoreCollectionPage<StockOrder>;

export type UseQueryStockOrderPageQueryKeyFn =
	GeneralizedUseQueryKeyFn<StockOrder>;

export type UseQueryStockOrderPageOptions =
	GeneralizedUseQueryPageOptions<StockOrder>;

export type UseQueryStockOrderPageProps =
	GeneralizedUseQueryPageProps<StockOrder>;

export type UseQueryStockOrderPageOptionsFn =
	GeneralizedUseQueryOptionsFn<StockOrder>;

export type UseQueryStockOrderPageObserver =
	GeneralizedUseQueryPageObserver<StockOrder>;

export type UseCreateStockOrderMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<
		StockOrder,
		CreateStockOrderParams
	>;
export type CreateStockOrderMutationData = StockOrder[];
export type CreateStockOrderMutationError = GeneralizedError;
export type CreateStockOrderMutationParams =
	FirestoreDocumentCreateParams<CreateStockOrderParams>;

export type UseUpdateStockOrderMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<UpdateStockOrderParams>;
export type UpdateStockOrderMutationData = unknown;
export type UpdateStockOrderMutationError = GeneralizedError;
export type UpdateStockOrderMutationParams =
	FirestoreDocumentUpdateParams<UpdateStockOrderParams>;
