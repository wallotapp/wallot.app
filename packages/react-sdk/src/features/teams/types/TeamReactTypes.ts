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
	Team,
	CreateTeamParams,
	UpdateTeamParams,
} from '@wallot/js';

export type TeamPageQueryResponse =
	GeneralizedFirestoreCollectionPage<Team>;

export type UseQueryTeamPageQueryKeyFn = GeneralizedUseQueryKeyFn<Team>;

export type UseQueryTeamPageOptions = GeneralizedUseQueryPageOptions<Team>;

export type UseQueryTeamPageProps = GeneralizedUseQueryPageProps<Team>;

export type UseQueryTeamPageOptionsFn = GeneralizedUseQueryOptionsFn<Team>;

export type UseQueryTeamPageObserver =
	GeneralizedUseQueryPageObserver<Team>;

export type UseCreateTeamMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<
		Team,
		CreateTeamParams
	>;
export type CreateTeamMutationData = GeneralizedResponse<Team>;
export type CreateTeamMutationError = GeneralizedResponse<Team>;
export type CreateTeamMutationParams =
	FirestoreDocumentCreateParams<CreateTeamParams>;

export type UseUpdateTeamMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<
		Team,
		UpdateTeamParams
	>;
export type UpdateTeamMutationData = unknown;
export type UpdateTeamMutationError = GeneralizedResponse<Team>;
export type UpdateTeamMutationParams =
	FirestoreDocumentUpdateParams<UpdateTeamParams>;
