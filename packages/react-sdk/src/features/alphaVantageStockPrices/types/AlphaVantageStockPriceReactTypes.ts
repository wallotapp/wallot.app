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
	AlphaVantageStockPrice,
	CreateAlphaVantageStockPriceParams,
	UpdateAlphaVantageStockPriceParams,
} from '@wallot/js';

export type AlphaVantageStockPricePageQueryResponse =
	GeneralizedFirestoreCollectionPage<AlphaVantageStockPrice>;

export type UseQueryAlphaVantageStockPricePageQueryKeyFn =
	GeneralizedUseQueryKeyFn<AlphaVantageStockPrice>;

export type UseQueryAlphaVantageStockPricePageOptions =
	GeneralizedUseQueryPageOptions<AlphaVantageStockPrice>;

export type UseQueryAlphaVantageStockPricePageProps =
	GeneralizedUseQueryPageProps<AlphaVantageStockPrice>;

export type UseQueryAlphaVantageStockPricePageOptionsFn =
	GeneralizedUseQueryOptionsFn<AlphaVantageStockPrice>;

export type UseQueryAlphaVantageStockPricePageObserver =
	GeneralizedUseQueryPageObserver<AlphaVantageStockPrice>;

export type UseCreateAlphaVantageStockPriceMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<
		AlphaVantageStockPrice,
		CreateAlphaVantageStockPriceParams
	>;
export type CreateAlphaVantageStockPriceMutationData =
	GeneralizedResponse<AlphaVantageStockPrice>;
export type CreateAlphaVantageStockPriceMutationError =
	GeneralizedResponse<AlphaVantageStockPrice>;
export type CreateAlphaVantageStockPriceMutationParams =
	FirestoreDocumentCreateParams<CreateAlphaVantageStockPriceParams>;

export type UseUpdateAlphaVantageStockPriceMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<
		AlphaVantageStockPrice,
		UpdateAlphaVantageStockPriceParams
	>;
export type UpdateAlphaVantageStockPriceMutationData = unknown;
export type UpdateAlphaVantageStockPriceMutationError =
	GeneralizedResponse<AlphaVantageStockPrice>;
export type UpdateAlphaVantageStockPriceMutationParams =
	FirestoreDocumentUpdateParams<UpdateAlphaVantageStockPriceParams>;
