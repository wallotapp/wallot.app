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
	AlpacaOrder,
	CreateAlpacaOrderParams,
	UpdateAlpacaOrderParams,
} from '@wallot/js';

export type AlpacaOrderPageQueryResponse =
	GeneralizedFirestoreCollectionPage<AlpacaOrder>;

export type UseQueryAlpacaOrderPageQueryKeyFn =
	GeneralizedUseQueryKeyFn<AlpacaOrder>;

export type UseQueryAlpacaOrderPageOptions =
	GeneralizedUseQueryPageOptions<AlpacaOrder>;

export type UseQueryAlpacaOrderPageProps =
	GeneralizedUseQueryPageProps<AlpacaOrder>;

export type UseQueryAlpacaOrderPageOptionsFn =
	GeneralizedUseQueryOptionsFn<AlpacaOrder>;

export type UseQueryAlpacaOrderPageObserver =
	GeneralizedUseQueryPageObserver<AlpacaOrder>;

export type UseCreateAlpacaOrderMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<
		AlpacaOrder,
		CreateAlpacaOrderParams
	>;
export type CreateAlpacaOrderMutationData = AlpacaOrder[];
export type CreateAlpacaOrderMutationError = GeneralizedError;
export type CreateAlpacaOrderMutationParams =
	FirestoreDocumentCreateParams<CreateAlpacaOrderParams>;

export type UseUpdateAlpacaOrderMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<UpdateAlpacaOrderParams>;
export type UpdateAlpacaOrderMutationData = unknown;
export type UpdateAlpacaOrderMutationError = GeneralizedError;
export type UpdateAlpacaOrderMutationParams =
	FirestoreDocumentUpdateParams<UpdateAlpacaOrderParams>;
