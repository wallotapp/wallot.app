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
	OpenAiRecommendation,
	CreateOpenAiRecommendationParams,
	UpdateOpenAiRecommendationParams,
} from '@wallot/js';

export type OpenAiRecommendationPageQueryResponse =
	GeneralizedFirestoreCollectionPage<OpenAiRecommendation>;

export type UseQueryOpenAiRecommendationPageQueryKeyFn =
	GeneralizedUseQueryKeyFn<OpenAiRecommendation>;

export type UseQueryOpenAiRecommendationPageOptions =
	GeneralizedUseQueryPageOptions<OpenAiRecommendation>;

export type UseQueryOpenAiRecommendationPageProps =
	GeneralizedUseQueryPageProps<OpenAiRecommendation>;

export type UseQueryOpenAiRecommendationPageOptionsFn =
	GeneralizedUseQueryOptionsFn<OpenAiRecommendation>;

export type UseQueryOpenAiRecommendationPageObserver =
	GeneralizedUseQueryPageObserver<OpenAiRecommendation>;

export type UseCreateOpenAiRecommendationMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<
		OpenAiRecommendation,
		CreateOpenAiRecommendationParams
	>;
export type CreateOpenAiRecommendationMutationData = OpenAiRecommendation[];
export type CreateOpenAiRecommendationMutationError = GeneralizedError;
export type CreateOpenAiRecommendationMutationParams =
	FirestoreDocumentCreateParams<CreateOpenAiRecommendationParams>;

export type UseUpdateOpenAiRecommendationMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<UpdateOpenAiRecommendationParams>;
export type UpdateOpenAiRecommendationMutationData = unknown;
export type UpdateOpenAiRecommendationMutationError = GeneralizedError;
export type UpdateOpenAiRecommendationMutationParams =
	FirestoreDocumentUpdateParams<UpdateOpenAiRecommendationParams>;
