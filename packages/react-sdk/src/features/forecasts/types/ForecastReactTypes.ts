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
	Forecast,
	CreateForecastParams,
	UpdateForecastParams,
} from '@wallot/js';

export type ForecastPageQueryResponse =
	GeneralizedFirestoreCollectionPage<Forecast>;

export type UseQueryForecastPageQueryKeyFn = GeneralizedUseQueryKeyFn<Forecast>;

export type UseQueryForecastPageOptions =
	GeneralizedUseQueryPageOptions<Forecast>;

export type UseQueryForecastPageProps = GeneralizedUseQueryPageProps<Forecast>;

export type UseQueryForecastPageOptionsFn =
	GeneralizedUseQueryOptionsFn<Forecast>;

export type UseQueryForecastPageObserver =
	GeneralizedUseQueryPageObserver<Forecast>;

export type UseCreateForecastMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<Forecast, CreateForecastParams>;
export type CreateForecastMutationData = Forecast[];
export type CreateForecastMutationError = GeneralizedError;
export type CreateForecastMutationParams =
	FirestoreDocumentCreateParams<CreateForecastParams>;

export type UseUpdateForecastMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<UpdateForecastParams>;
export type UpdateForecastMutationData = unknown;
export type UpdateForecastMutationError = GeneralizedError;
export type UpdateForecastMutationParams =
	FirestoreDocumentUpdateParams<UpdateForecastParams>;
