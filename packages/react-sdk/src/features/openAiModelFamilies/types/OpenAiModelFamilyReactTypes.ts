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
	OpenAiModelFamily,
	CreateOpenAiModelFamilyParams,
	UpdateOpenAiModelFamilyParams,
} from '@wallot/js';

export type OpenAiModelFamilyPageQueryResponse =
	GeneralizedFirestoreCollectionPage<OpenAiModelFamily>;

export type UseQueryOpenAiModelFamilyPageQueryKeyFn =
	GeneralizedUseQueryKeyFn<OpenAiModelFamily>;

export type UseQueryOpenAiModelFamilyPageOptions =
	GeneralizedUseQueryPageOptions<OpenAiModelFamily>;

export type UseQueryOpenAiModelFamilyPageProps =
	GeneralizedUseQueryPageProps<OpenAiModelFamily>;

export type UseQueryOpenAiModelFamilyPageOptionsFn =
	GeneralizedUseQueryOptionsFn<OpenAiModelFamily>;

export type UseQueryOpenAiModelFamilyPageObserver =
	GeneralizedUseQueryPageObserver<OpenAiModelFamily>;

export type UseCreateOpenAiModelFamilyMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<
		OpenAiModelFamily,
		CreateOpenAiModelFamilyParams
	>;
export type CreateOpenAiModelFamilyMutationData = OpenAiModelFamily[];
export type CreateOpenAiModelFamilyMutationError = GeneralizedError;
export type CreateOpenAiModelFamilyMutationParams =
	FirestoreDocumentCreateParams<CreateOpenAiModelFamilyParams>;

export type UseUpdateOpenAiModelFamilyMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<UpdateOpenAiModelFamilyParams>;
export type UpdateOpenAiModelFamilyMutationData = unknown;
export type UpdateOpenAiModelFamilyMutationError = GeneralizedError;
export type UpdateOpenAiModelFamilyMutationParams =
	FirestoreDocumentUpdateParams<UpdateOpenAiModelFamilyParams>;
