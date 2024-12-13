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
import {
	PaymentMethod,
	CreatePaymentMethodParams,
	UpdatePaymentMethodParams,
} from '@wallot/js';

export type PaymentMethodPageQueryResponse =
	GeneralizedFirestoreCollectionPage<PaymentMethod>;

export type UseQueryPaymentMethodPageQueryKeyFn = GeneralizedUseQueryKeyFn<PaymentMethod>;

export type UseQueryPaymentMethodPageOptions = GeneralizedUseQueryPageOptions<PaymentMethod>;

export type UseQueryPaymentMethodPageProps = GeneralizedUseQueryPageProps<PaymentMethod>;

export type UseQueryPaymentMethodPageOptionsFn = GeneralizedUseQueryOptionsFn<PaymentMethod>;

export type UseQueryPaymentMethodPageObserver =
	GeneralizedUseQueryPageObserver<PaymentMethod>;

export type UseCreatePaymentMethodMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<
		PaymentMethod,
		CreatePaymentMethodParams
	>;
export type CreatePaymentMethodMutationData = GeneralizedResponse<PaymentMethod>;
export type CreatePaymentMethodMutationError = GeneralizedResponse<PaymentMethod>;
export type CreatePaymentMethodMutationParams =
	FirestoreDocumentCreateParams<CreatePaymentMethodParams>;

export type UseUpdatePaymentMethodMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<
		PaymentMethod,
		UpdatePaymentMethodParams
	>;
export type UpdatePaymentMethodMutationData = unknown;
export type UpdatePaymentMethodMutationError = GeneralizedResponse<PaymentMethod>;
export type UpdatePaymentMethodMutationParams =
	FirestoreDocumentUpdateParams<UpdatePaymentMethodParams>;
