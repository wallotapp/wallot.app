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
	Recommendation,
	CreateRecommendationParams,
	UpdateRecommendationParams,
} from '@wallot/js';

export type RecommendationPageQueryResponse =
	GeneralizedFirestoreCollectionPage<Recommendation>;

export type UseQueryRecommendationPageQueryKeyFn = GeneralizedUseQueryKeyFn<Recommendation>;

export type UseQueryRecommendationPageOptions = GeneralizedUseQueryPageOptions<Recommendation>;

export type UseQueryRecommendationPageProps = GeneralizedUseQueryPageProps<Recommendation>;

export type UseQueryRecommendationPageOptionsFn = GeneralizedUseQueryOptionsFn<Recommendation>;

export type UseQueryRecommendationPageObserver =
	GeneralizedUseQueryPageObserver<Recommendation>;

export type UseCreateRecommendationMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<
		Recommendation,
		CreateRecommendationParams
	>;
export type CreateRecommendationMutationData = GeneralizedResponse<Recommendation>;
export type CreateRecommendationMutationError = GeneralizedResponse<Recommendation>;
export type CreateRecommendationMutationParams =
	FirestoreDocumentCreateParams<CreateRecommendationParams>;

export type UseUpdateRecommendationMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<
		Recommendation,
		UpdateRecommendationParams
	>;
export type UpdateRecommendationMutationData = unknown;
export type UpdateRecommendationMutationError = GeneralizedResponse<Recommendation>;
export type UpdateRecommendationMutationParams =
	FirestoreDocumentUpdateParams<UpdateRecommendationParams>;
