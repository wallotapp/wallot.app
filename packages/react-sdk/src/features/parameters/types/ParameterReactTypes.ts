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
	Parameter,
	CreateParameterParams,
	UpdateParameterParams,
} from '@wallot/js';

export type ParameterPageQueryResponse =
	GeneralizedFirestoreCollectionPage<Parameter>;

export type UseQueryParameterPageQueryKeyFn =
	GeneralizedUseQueryKeyFn<Parameter>;

export type UseQueryParameterPageOptions =
	GeneralizedUseQueryPageOptions<Parameter>;

export type UseQueryParameterPageProps =
	GeneralizedUseQueryPageProps<Parameter>;

export type UseQueryParameterPageOptionsFn =
	GeneralizedUseQueryOptionsFn<Parameter>;

export type UseQueryParameterPageObserver =
	GeneralizedUseQueryPageObserver<Parameter>;

export type UseCreateParameterMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<
		Parameter,
		CreateParameterParams
	>;
export type CreateParameterMutationData = GeneralizedResponse<Parameter>;
export type CreateParameterMutationError = GeneralizedResponse<Parameter>;
export type CreateParameterMutationParams =
	FirestoreDocumentCreateParams<CreateParameterParams>;

export type UseUpdateParameterMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<
		Parameter,
		UpdateParameterParams
	>;
export type UpdateParameterMutationData = unknown;
export type UpdateParameterMutationError = GeneralizedResponse<Parameter>;
export type UpdateParameterMutationParams =
	FirestoreDocumentUpdateParams<UpdateParameterParams>;
