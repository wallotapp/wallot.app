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
	StripePaymentMethod,
	CreateStripePaymentMethodParams,
	UpdateStripePaymentMethodParams,
} from '@wallot/js';

export type StripePaymentMethodPageQueryResponse =
	GeneralizedFirestoreCollectionPage<StripePaymentMethod>;

export type UseQueryStripePaymentMethodPageQueryKeyFn =
	GeneralizedUseQueryKeyFn<StripePaymentMethod>;

export type UseQueryStripePaymentMethodPageOptions =
	GeneralizedUseQueryPageOptions<StripePaymentMethod>;

export type UseQueryStripePaymentMethodPageProps =
	GeneralizedUseQueryPageProps<StripePaymentMethod>;

export type UseQueryStripePaymentMethodPageOptionsFn =
	GeneralizedUseQueryOptionsFn<StripePaymentMethod>;

export type UseQueryStripePaymentMethodPageObserver =
	GeneralizedUseQueryPageObserver<StripePaymentMethod>;

export type UseCreateStripePaymentMethodMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<
		StripePaymentMethod,
		CreateStripePaymentMethodParams
	>;
export type CreateStripePaymentMethodMutationData =
	GeneralizedResponse<StripePaymentMethod>;
export type CreateStripePaymentMethodMutationError =
	GeneralizedResponse<StripePaymentMethod>;
export type CreateStripePaymentMethodMutationParams =
	FirestoreDocumentCreateParams<CreateStripePaymentMethodParams>;

export type UseUpdateStripePaymentMethodMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<
		StripePaymentMethod,
		UpdateStripePaymentMethodParams
	>;
export type UpdateStripePaymentMethodMutationData = unknown;
export type UpdateStripePaymentMethodMutationError =
	GeneralizedResponse<StripePaymentMethod>;
export type UpdateStripePaymentMethodMutationParams =
	FirestoreDocumentUpdateParams<UpdateStripePaymentMethodParams>;
