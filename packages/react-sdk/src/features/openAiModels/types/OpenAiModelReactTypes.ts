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
import { OpenAiModel, CreateOpenAiModelParams, UpdateOpenAiModelParams } from '@wallot/js';

export type OpenAiModelPageQueryResponse = GeneralizedFirestoreCollectionPage<OpenAiModel>;

export type UseQueryOpenAiModelPageQueryKeyFn = GeneralizedUseQueryKeyFn<OpenAiModel>;

export type UseQueryOpenAiModelPageOptions = GeneralizedUseQueryPageOptions<OpenAiModel>;

export type UseQueryOpenAiModelPageProps = GeneralizedUseQueryPageProps<OpenAiModel>;

export type UseQueryOpenAiModelPageOptionsFn = GeneralizedUseQueryOptionsFn<OpenAiModel>;

export type UseQueryOpenAiModelPageObserver = GeneralizedUseQueryPageObserver<OpenAiModel>;

export type UseCreateOpenAiModelMutationOptions = GeneralizedUseCreateDocumentsMutationOptions<OpenAiModel, CreateOpenAiModelParams>;
export type CreateOpenAiModelMutationData = OpenAiModel[];
export type CreateOpenAiModelMutationError = GeneralizedError;
export type CreateOpenAiModelMutationParams = FirestoreDocumentCreateParams<CreateOpenAiModelParams>;

export type UseUpdateOpenAiModelMutationOptions = GeneralizedUseUpdateDocumentsMutationOptions<UpdateOpenAiModelParams>;
export type UpdateOpenAiModelMutationData = unknown;
export type UpdateOpenAiModelMutationError = GeneralizedError;
export type UpdateOpenAiModelMutationParams = FirestoreDocumentUpdateParams<UpdateOpenAiModelParams>;
