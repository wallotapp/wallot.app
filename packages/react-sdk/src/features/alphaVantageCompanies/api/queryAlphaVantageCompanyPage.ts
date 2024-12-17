import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import { AlphaVantageCompany, alphaVantageCompaniesApi } from '@wallot/js';

export const queryAlphaVantageCompanyPage =
	generalizedFirestoreCollectionPageQuery<AlphaVantageCompany>(
		alphaVantageCompaniesApi as unknown as GeneralizedApiResourceSpec,
	);
