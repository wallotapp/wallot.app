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
	StripeInvoice,
	CreateStripeInvoiceParams,
	UpdateStripeInvoiceParams,
} from '@wallot/js';

export type StripeInvoicePageQueryResponse =
	GeneralizedFirestoreCollectionPage<StripeInvoice>;

export type UseQueryStripeInvoicePageQueryKeyFn =
	GeneralizedUseQueryKeyFn<StripeInvoice>;

export type UseQueryStripeInvoicePageOptions =
	GeneralizedUseQueryPageOptions<StripeInvoice>;

export type UseQueryStripeInvoicePageProps =
	GeneralizedUseQueryPageProps<StripeInvoice>;

export type UseQueryStripeInvoicePageOptionsFn =
	GeneralizedUseQueryOptionsFn<StripeInvoice>;

export type UseQueryStripeInvoicePageObserver =
	GeneralizedUseQueryPageObserver<StripeInvoice>;

export type UseCreateStripeInvoiceMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<
		StripeInvoice,
		CreateStripeInvoiceParams
	>;
export type CreateStripeInvoiceMutationData =
	GeneralizedResponse<StripeInvoice>;
export type CreateStripeInvoiceMutationError =
	GeneralizedResponse<StripeInvoice>;
export type CreateStripeInvoiceMutationParams =
	FirestoreDocumentCreateParams<CreateStripeInvoiceParams>;

export type UseUpdateStripeInvoiceMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<
		StripeInvoice,
		UpdateStripeInvoiceParams
	>;
export type UpdateStripeInvoiceMutationData = unknown;
export type UpdateStripeInvoiceMutationError =
	GeneralizedResponse<StripeInvoice>;
export type UpdateStripeInvoiceMutationParams =
	FirestoreDocumentUpdateParams<UpdateStripeInvoiceParams>;
