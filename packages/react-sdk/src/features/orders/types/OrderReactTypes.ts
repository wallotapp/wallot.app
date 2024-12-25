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
import { FirestoreDocumentCreateParams, FirestoreDocumentUpdateParams, GeneralizedFirestoreCollectionPage } from 'ergonomic-react/src/features/data';
import { Order, CreateOrderParams, UpdateOrderParams } from '@wallot/js';

export type OrderPageQueryResponse = GeneralizedFirestoreCollectionPage<Order>;

export type UseQueryOrderPageQueryKeyFn = GeneralizedUseQueryKeyFn<Order>;

export type UseQueryOrderPageOptions = GeneralizedUseQueryPageOptions<Order>;

export type UseQueryOrderPageProps = GeneralizedUseQueryPageProps<Order>;

export type UseQueryOrderPageOptionsFn = GeneralizedUseQueryOptionsFn<Order>;

export type UseQueryOrderPageObserver = GeneralizedUseQueryPageObserver<Order>;

export type UseCreateOrderMutationOptions = GeneralizedUseCreateDocumentsMutationOptions<Order, CreateOrderParams>;
export type CreateOrderMutationData = Order[];
export type CreateOrderMutationError = GeneralizedError;
export type CreateOrderMutationParams = FirestoreDocumentCreateParams<CreateOrderParams>;

export type UseUpdateOrderMutationOptions = GeneralizedUseUpdateDocumentsMutationOptions<UpdateOrderParams>;
export type UpdateOrderMutationData = unknown;
export type UpdateOrderMutationError = GeneralizedError;
export type UpdateOrderMutationParams = FirestoreDocumentUpdateParams<UpdateOrderParams>;
