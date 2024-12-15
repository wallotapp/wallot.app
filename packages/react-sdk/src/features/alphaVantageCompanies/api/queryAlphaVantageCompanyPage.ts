import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	AlphaVantageCompany,
	getFirestoreCollectionPath,
	alphaVantageCompaniesApi,
} from '@wallot/js';

export const queryAlphaVantageCompanyPage =
	generalizedFirestoreCollectionPageQuery<AlphaVantageCompany>(
		getFirestoreCollectionPath('alpha_vantage_company'),
		alphaVantageCompaniesApi as unknown as GeneralizedApiResourceSpec,
	);
