import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateAlphaVantageCompanyParams,
	AlphaVantageCompany,
	getFirestoreCollectionPath,
	alphaVantageCompaniesApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createAlphaVantageCompany =
	generalizedFirestoreDocumentCreateOperation<
		CreateAlphaVantageCompanyParams,
		AlphaVantageCompany
	>(
		getFirestoreCollectionPath('alpha_vantage_company'),
		alphaVantageCompaniesApi as unknown as GeneralizedApiResourceSpec,
	);
