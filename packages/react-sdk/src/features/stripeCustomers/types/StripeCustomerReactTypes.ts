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
	StripeCustomer,
	CreateStripeCustomerParams,
	UpdateStripeCustomerParams,
} from '@wallot/js';

export type StripeCustomerPageQueryResponse =
	GeneralizedFirestoreCollectionPage<StripeCustomer>;

export type UseQueryStripeCustomerPageQueryKeyFn =
	GeneralizedUseQueryKeyFn<StripeCustomer>;

export type UseQueryStripeCustomerPageOptions =
	GeneralizedUseQueryPageOptions<StripeCustomer>;

export type UseQueryStripeCustomerPageProps =
	GeneralizedUseQueryPageProps<StripeCustomer>;

export type UseQueryStripeCustomerPageOptionsFn =
	GeneralizedUseQueryOptionsFn<StripeCustomer>;

export type UseQueryStripeCustomerPageObserver =
	GeneralizedUseQueryPageObserver<StripeCustomer>;

export type UseCreateStripeCustomerMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<
		StripeCustomer,
		CreateStripeCustomerParams
	>;
export type CreateStripeCustomerMutationData =
	GeneralizedResponse<StripeCustomer>;
export type CreateStripeCustomerMutationError =
	GeneralizedResponse<StripeCustomer>;
export type CreateStripeCustomerMutationParams =
	FirestoreDocumentCreateParams<CreateStripeCustomerParams>;

export type UseUpdateStripeCustomerMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<
		StripeCustomer,
		UpdateStripeCustomerParams
	>;
export type UpdateStripeCustomerMutationData = unknown;
export type UpdateStripeCustomerMutationError =
	GeneralizedResponse<StripeCustomer>;
export type UpdateStripeCustomerMutationParams =
	FirestoreDocumentUpdateParams<UpdateStripeCustomerParams>;
