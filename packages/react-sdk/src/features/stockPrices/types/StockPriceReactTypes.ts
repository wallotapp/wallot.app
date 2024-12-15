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
	StockPrice,
	CreateStockPriceParams,
	UpdateStockPriceParams,
} from '@wallot/js';

export type StockPricePageQueryResponse =
	GeneralizedFirestoreCollectionPage<StockPrice>;

export type UseQueryStockPricePageQueryKeyFn =
	GeneralizedUseQueryKeyFn<StockPrice>;

export type UseQueryStockPricePageOptions =
	GeneralizedUseQueryPageOptions<StockPrice>;

export type UseQueryStockPricePageProps =
	GeneralizedUseQueryPageProps<StockPrice>;

export type UseQueryStockPricePageOptionsFn =
	GeneralizedUseQueryOptionsFn<StockPrice>;

export type UseQueryStockPricePageObserver =
	GeneralizedUseQueryPageObserver<StockPrice>;

export type UseCreateStockPriceMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<
		StockPrice,
		CreateStockPriceParams
	>;
export type CreateStockPriceMutationData = GeneralizedResponse<StockPrice>;
export type CreateStockPriceMutationError = GeneralizedResponse<StockPrice>;
export type CreateStockPriceMutationParams =
	FirestoreDocumentCreateParams<CreateStockPriceParams>;

export type UseUpdateStockPriceMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<
		StockPrice,
		UpdateStockPriceParams
	>;
export type UpdateStockPriceMutationData = unknown;
export type UpdateStockPriceMutationError = GeneralizedResponse<StockPrice>;
export type UpdateStockPriceMutationParams =
	FirestoreDocumentUpdateParams<UpdateStockPriceParams>;
