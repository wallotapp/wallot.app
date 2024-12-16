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
	AlpacaAchRelationship,
	CreateAlpacaAchRelationshipParams,
	UpdateAlpacaAchRelationshipParams,
} from '@wallot/js';

export type AlpacaAchRelationshipPageQueryResponse =
	GeneralizedFirestoreCollectionPage<AlpacaAchRelationship>;

export type UseQueryAlpacaAchRelationshipPageQueryKeyFn =
	GeneralizedUseQueryKeyFn<AlpacaAchRelationship>;

export type UseQueryAlpacaAchRelationshipPageOptions =
	GeneralizedUseQueryPageOptions<AlpacaAchRelationship>;

export type UseQueryAlpacaAchRelationshipPageProps =
	GeneralizedUseQueryPageProps<AlpacaAchRelationship>;

export type UseQueryAlpacaAchRelationshipPageOptionsFn =
	GeneralizedUseQueryOptionsFn<AlpacaAchRelationship>;

export type UseQueryAlpacaAchRelationshipPageObserver =
	GeneralizedUseQueryPageObserver<AlpacaAchRelationship>;

export type UseCreateAlpacaAchRelationshipMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<
		AlpacaAchRelationship,
		CreateAlpacaAchRelationshipParams
	>;
export type CreateAlpacaAchRelationshipMutationData = AlpacaAchRelationship[];
export type CreateAlpacaAchRelationshipMutationError = GeneralizedError;
export type CreateAlpacaAchRelationshipMutationParams =
	FirestoreDocumentCreateParams<CreateAlpacaAchRelationshipParams>;

export type UseUpdateAlpacaAchRelationshipMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<UpdateAlpacaAchRelationshipParams>;
export type UpdateAlpacaAchRelationshipMutationData = unknown;
export type UpdateAlpacaAchRelationshipMutationError = GeneralizedError;
export type UpdateAlpacaAchRelationshipMutationParams =
	FirestoreDocumentUpdateParams<UpdateAlpacaAchRelationshipParams>;
