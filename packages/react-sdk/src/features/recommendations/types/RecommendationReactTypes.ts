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
import { Recommendation, CreateRecommendationParams, UpdateRecommendationParams } from '@wallot/js';

export type RecommendationPageQueryResponse = GeneralizedFirestoreCollectionPage<Recommendation>;

export type UseQueryRecommendationPageQueryKeyFn = GeneralizedUseQueryKeyFn<Recommendation>;

export type UseQueryRecommendationPageOptions = GeneralizedUseQueryPageOptions<Recommendation>;

export type UseQueryRecommendationPageProps = GeneralizedUseQueryPageProps<Recommendation>;

export type UseQueryRecommendationPageOptionsFn = GeneralizedUseQueryOptionsFn<Recommendation>;

export type UseQueryRecommendationPageObserver = GeneralizedUseQueryPageObserver<Recommendation>;

export type UseCreateRecommendationMutationOptions = GeneralizedUseCreateDocumentsMutationOptions<Recommendation, CreateRecommendationParams>;
export type CreateRecommendationMutationData = Recommendation[];
export type CreateRecommendationMutationError = GeneralizedError;
export type CreateRecommendationMutationParams = FirestoreDocumentCreateParams<CreateRecommendationParams>;

export type UseUpdateRecommendationMutationOptions = GeneralizedUseUpdateDocumentsMutationOptions<UpdateRecommendationParams>;
export type UpdateRecommendationMutationData = unknown;
export type UpdateRecommendationMutationError = GeneralizedError;
export type UpdateRecommendationMutationParams = FirestoreDocumentUpdateParams<UpdateRecommendationParams>;
