import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	FundingAccount,
	getFirestoreCollectionPath,
	fundingAccountsApi,
} from '@wallot/js';

export const queryFundingAccountPage =
	generalizedFirestoreCollectionPageQuery<FundingAccount>(
		getFirestoreCollectionPath('funding_account'),
		fundingAccountsApi as unknown as GeneralizedApiResourceSpec,
	);
