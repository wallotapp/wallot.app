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
	SystemIncident,
	CreateSystemIncidentParams,
	UpdateSystemIncidentParams,
} from '@wallot/js';

export type SystemIncidentPageQueryResponse =
	GeneralizedFirestoreCollectionPage<SystemIncident>;

export type UseQuerySystemIncidentPageQueryKeyFn =
	GeneralizedUseQueryKeyFn<SystemIncident>;

export type UseQuerySystemIncidentPageOptions =
	GeneralizedUseQueryPageOptions<SystemIncident>;

export type UseQuerySystemIncidentPageProps =
	GeneralizedUseQueryPageProps<SystemIncident>;

export type UseQuerySystemIncidentPageOptionsFn =
	GeneralizedUseQueryOptionsFn<SystemIncident>;

export type UseQuerySystemIncidentPageObserver =
	GeneralizedUseQueryPageObserver<SystemIncident>;

export type UseCreateSystemIncidentMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<
		SystemIncident,
		CreateSystemIncidentParams
	>;
export type CreateSystemIncidentMutationData =
	GeneralizedResponse<SystemIncident>;
export type CreateSystemIncidentMutationError =
	GeneralizedResponse<SystemIncident>;
export type CreateSystemIncidentMutationParams =
	FirestoreDocumentCreateParams<CreateSystemIncidentParams>;

export type UseUpdateSystemIncidentMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<
		SystemIncident,
		UpdateSystemIncidentParams
	>;
export type UpdateSystemIncidentMutationData = unknown;
export type UpdateSystemIncidentMutationError =
	GeneralizedResponse<SystemIncident>;
export type UpdateSystemIncidentMutationParams =
	FirestoreDocumentUpdateParams<UpdateSystemIncidentParams>;
