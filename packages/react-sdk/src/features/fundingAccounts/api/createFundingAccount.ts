import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateFundingAccountParams,
	FundingAccount,
	getFirestoreCollectionPath,
	fundingAccountsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createFundingAccount = generalizedFirestoreDocumentCreateOperation<
	CreateFundingAccountParams,
	FundingAccount
>(
	getFirestoreCollectionPath('funding_account'),
	fundingAccountsApi as unknown as GeneralizedApiResourceSpec,
);
