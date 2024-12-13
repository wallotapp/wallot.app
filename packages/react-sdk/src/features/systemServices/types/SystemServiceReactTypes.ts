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
	SystemService,
	CreateSystemServiceParams,
	UpdateSystemServiceParams,
} from '@wallot/js';

export type SystemServicePageQueryResponse =
	GeneralizedFirestoreCollectionPage<SystemService>;

export type UseQuerySystemServicePageQueryKeyFn =
	GeneralizedUseQueryKeyFn<SystemService>;

export type UseQuerySystemServicePageOptions =
	GeneralizedUseQueryPageOptions<SystemService>;

export type UseQuerySystemServicePageProps =
	GeneralizedUseQueryPageProps<SystemService>;

export type UseQuerySystemServicePageOptionsFn =
	GeneralizedUseQueryOptionsFn<SystemService>;

export type UseQuerySystemServicePageObserver =
	GeneralizedUseQueryPageObserver<SystemService>;

export type UseCreateSystemServiceMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<
		SystemService,
		CreateSystemServiceParams
	>;
export type CreateSystemServiceMutationData =
	GeneralizedResponse<SystemService>;
export type CreateSystemServiceMutationError =
	GeneralizedResponse<SystemService>;
export type CreateSystemServiceMutationParams =
	FirestoreDocumentCreateParams<CreateSystemServiceParams>;

export type UseUpdateSystemServiceMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<
		SystemService,
		UpdateSystemServiceParams
	>;
export type UpdateSystemServiceMutationData = unknown;
export type UpdateSystemServiceMutationError =
	GeneralizedResponse<SystemService>;
export type UpdateSystemServiceMutationParams =
	FirestoreDocumentUpdateParams<UpdateSystemServiceParams>;
