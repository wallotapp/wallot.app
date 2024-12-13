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
	SystemIncidentUpdate,
	CreateSystemIncidentUpdateParams,
	UpdateSystemIncidentUpdateParams,
} from '@wallot/js';

export type SystemIncidentUpdatePageQueryResponse =
	GeneralizedFirestoreCollectionPage<SystemIncidentUpdate>;

export type UseQuerySystemIncidentUpdatePageQueryKeyFn =
	GeneralizedUseQueryKeyFn<SystemIncidentUpdate>;

export type UseQuerySystemIncidentUpdatePageOptions =
	GeneralizedUseQueryPageOptions<SystemIncidentUpdate>;

export type UseQuerySystemIncidentUpdatePageProps =
	GeneralizedUseQueryPageProps<SystemIncidentUpdate>;

export type UseQuerySystemIncidentUpdatePageOptionsFn =
	GeneralizedUseQueryOptionsFn<SystemIncidentUpdate>;

export type UseQuerySystemIncidentUpdatePageObserver =
	GeneralizedUseQueryPageObserver<SystemIncidentUpdate>;

export type UseCreateSystemIncidentUpdateMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<
		SystemIncidentUpdate,
		CreateSystemIncidentUpdateParams
	>;
export type CreateSystemIncidentUpdateMutationData =
	GeneralizedResponse<SystemIncidentUpdate>;
export type CreateSystemIncidentUpdateMutationError =
	GeneralizedResponse<SystemIncidentUpdate>;
export type CreateSystemIncidentUpdateMutationParams =
	FirestoreDocumentCreateParams<CreateSystemIncidentUpdateParams>;

export type UseUpdateSystemIncidentUpdateMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<
		SystemIncidentUpdate,
		UpdateSystemIncidentUpdateParams
	>;
export type UpdateSystemIncidentUpdateMutationData = unknown;
export type UpdateSystemIncidentUpdateMutationError =
	GeneralizedResponse<SystemIncidentUpdate>;
export type UpdateSystemIncidentUpdateMutationParams =
	FirestoreDocumentUpdateParams<UpdateSystemIncidentUpdateParams>;
