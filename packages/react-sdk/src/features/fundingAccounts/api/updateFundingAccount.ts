import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateFundingAccountParams,
	FundingAccount,
	getFirestoreCollectionPath,
	fundingAccountsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateFundingAccount =
	generalizedFirestoreDocumentUpdateOperation<
		UpdateFundingAccountParams,
		FundingAccount
	>(
		getFirestoreCollectionPath('funding_account'),
		fundingAccountsApi as unknown as GeneralizedApiResourceSpec,
	);
