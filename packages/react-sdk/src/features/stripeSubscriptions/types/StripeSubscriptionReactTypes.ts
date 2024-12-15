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
	StripeSubscription,
	CreateStripeSubscriptionParams,
	UpdateStripeSubscriptionParams,
} from '@wallot/js';

export type StripeSubscriptionPageQueryResponse =
	GeneralizedFirestoreCollectionPage<StripeSubscription>;

export type UseQueryStripeSubscriptionPageQueryKeyFn =
	GeneralizedUseQueryKeyFn<StripeSubscription>;

export type UseQueryStripeSubscriptionPageOptions =
	GeneralizedUseQueryPageOptions<StripeSubscription>;

export type UseQueryStripeSubscriptionPageProps =
	GeneralizedUseQueryPageProps<StripeSubscription>;

export type UseQueryStripeSubscriptionPageOptionsFn =
	GeneralizedUseQueryOptionsFn<StripeSubscription>;

export type UseQueryStripeSubscriptionPageObserver =
	GeneralizedUseQueryPageObserver<StripeSubscription>;

export type UseCreateStripeSubscriptionMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<
		StripeSubscription,
		CreateStripeSubscriptionParams
	>;
export type CreateStripeSubscriptionMutationData =
	GeneralizedResponse<StripeSubscription>;
export type CreateStripeSubscriptionMutationError =
	GeneralizedResponse<StripeSubscription>;
export type CreateStripeSubscriptionMutationParams =
	FirestoreDocumentCreateParams<CreateStripeSubscriptionParams>;

export type UseUpdateStripeSubscriptionMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<
		StripeSubscription,
		UpdateStripeSubscriptionParams
	>;
export type UpdateStripeSubscriptionMutationData = unknown;
export type UpdateStripeSubscriptionMutationError =
	GeneralizedResponse<StripeSubscription>;
export type UpdateStripeSubscriptionMutationParams =
	FirestoreDocumentUpdateParams<UpdateStripeSubscriptionParams>;
