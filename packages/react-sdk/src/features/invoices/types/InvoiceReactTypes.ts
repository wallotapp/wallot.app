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
import { Invoice, CreateInvoiceParams, UpdateInvoiceParams } from '@wallot/js';

export type InvoicePageQueryResponse =
	GeneralizedFirestoreCollectionPage<Invoice>;

export type UseQueryInvoicePageQueryKeyFn = GeneralizedUseQueryKeyFn<Invoice>;

export type UseQueryInvoicePageOptions =
	GeneralizedUseQueryPageOptions<Invoice>;

export type UseQueryInvoicePageProps = GeneralizedUseQueryPageProps<Invoice>;

export type UseQueryInvoicePageOptionsFn =
	GeneralizedUseQueryOptionsFn<Invoice>;

export type UseQueryInvoicePageObserver =
	GeneralizedUseQueryPageObserver<Invoice>;

export type UseCreateInvoiceMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<Invoice, CreateInvoiceParams>;
export type CreateInvoiceMutationData = GeneralizedResponse<Invoice>;
export type CreateInvoiceMutationError = GeneralizedResponse<Invoice>;
export type CreateInvoiceMutationParams =
	FirestoreDocumentCreateParams<CreateInvoiceParams>;

export type UseUpdateInvoiceMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<Invoice, UpdateInvoiceParams>;
export type UpdateInvoiceMutationData = unknown;
export type UpdateInvoiceMutationError = GeneralizedResponse<Invoice>;
export type UpdateInvoiceMutationParams =
	FirestoreDocumentUpdateParams<UpdateInvoiceParams>;
