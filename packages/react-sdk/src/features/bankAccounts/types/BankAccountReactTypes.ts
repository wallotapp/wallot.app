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
	BankAccount,
	CreateBankAccountParams,
	UpdateBankAccountParams,
} from '@wallot/js';

export type BankAccountPageQueryResponse =
	GeneralizedFirestoreCollectionPage<BankAccount>;

export type UseQueryBankAccountPageQueryKeyFn =
	GeneralizedUseQueryKeyFn<BankAccount>;

export type UseQueryBankAccountPageOptions =
	GeneralizedUseQueryPageOptions<BankAccount>;

export type UseQueryBankAccountPageProps =
	GeneralizedUseQueryPageProps<BankAccount>;

export type UseQueryBankAccountPageOptionsFn =
	GeneralizedUseQueryOptionsFn<BankAccount>;

export type UseQueryBankAccountPageObserver =
	GeneralizedUseQueryPageObserver<BankAccount>;

export type UseCreateBankAccountMutationOptions =
	GeneralizedUseCreateDocumentsMutationOptions<
		BankAccount,
		CreateBankAccountParams
	>;
export type CreateBankAccountMutationData = BankAccount[];
export type CreateBankAccountMutationError = GeneralizedError;
export type CreateBankAccountMutationParams =
	FirestoreDocumentCreateParams<CreateBankAccountParams>;

export type UseUpdateBankAccountMutationOptions =
	GeneralizedUseUpdateDocumentsMutationOptions<UpdateBankAccountParams>;
export type UpdateBankAccountMutationData = unknown;
export type UpdateBankAccountMutationError = GeneralizedError;
export type UpdateBankAccountMutationParams =
	FirestoreDocumentUpdateParams<UpdateBankAccountParams>;
