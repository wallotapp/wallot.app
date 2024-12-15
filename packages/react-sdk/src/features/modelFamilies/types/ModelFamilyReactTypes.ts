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
	ModelFamily,
	CreateModelFamilyParams,
	UpdateModelFamilyParams,
} from '@wallot/js';

export type ModelFamilyPageQueryResponse =
	GeneralizedFirestoreCollectionPage<ModelFamily>;

export type UseQueryModelFamilyPageQueryKeyFn =
	GeneralizedUseQueryKeyFn<ModelFamily>;

export type UseQueryModelFamilyPageOptions =
	GeneralizedUseQueryPageOptions<ModelFamily>;

export type UseQueryModelFamilyPageProps =
	GeneralizedUseQueryPageProps<ModelFamily>;

export type UseQueryModelFamilyPageOptionsFn =
	GeneralizedUseQueryOptionsFn<ModelFamily>;

export type UseQueryModelFamilyPageObserver =
	GeneralizedUseQueryPageObserver<ModelFamily>;

export type UseCreateModelFamilyMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<
		ModelFamily,
		CreateModelFamilyParams
	>;
export type CreateModelFamilyMutationData = GeneralizedResponse<ModelFamily>;
export type CreateModelFamilyMutationError = GeneralizedResponse<ModelFamily>;
export type CreateModelFamilyMutationParams =
	FirestoreDocumentCreateParams<CreateModelFamilyParams>;

export type UseUpdateModelFamilyMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<
		ModelFamily,
		UpdateModelFamilyParams
	>;
export type UpdateModelFamilyMutationData = unknown;
export type UpdateModelFamilyMutationError = GeneralizedResponse<ModelFamily>;
export type UpdateModelFamilyMutationParams =
	FirestoreDocumentUpdateParams<UpdateModelFamilyParams>;
