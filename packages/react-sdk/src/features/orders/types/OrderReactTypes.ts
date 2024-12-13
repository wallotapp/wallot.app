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
import { Order, CreateOrderParams, UpdateOrderParams } from '@wallot/js';

export type OrderPageQueryResponse = GeneralizedFirestoreCollectionPage<Order>;

export type UseQueryOrderPageQueryKeyFn = GeneralizedUseQueryKeyFn<Order>;

export type UseQueryOrderPageOptions = GeneralizedUseQueryPageOptions<Order>;

export type UseQueryOrderPageProps = GeneralizedUseQueryPageProps<Order>;

export type UseQueryOrderPageOptionsFn = GeneralizedUseQueryOptionsFn<Order>;

export type UseQueryOrderPageObserver = GeneralizedUseQueryPageObserver<Order>;

export type UseCreateOrderMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<Order, CreateOrderParams>;
export type CreateOrderMutationData = GeneralizedResponse<Order>;
export type CreateOrderMutationError = GeneralizedResponse<Order>;
export type CreateOrderMutationParams =
	FirestoreDocumentCreateParams<CreateOrderParams>;

export type UseUpdateOrderMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<Order, UpdateOrderParams>;
export type UpdateOrderMutationData = unknown;
export type UpdateOrderMutationError = GeneralizedResponse<Order>;
export type UpdateOrderMutationParams =
	FirestoreDocumentUpdateParams<UpdateOrderParams>;
