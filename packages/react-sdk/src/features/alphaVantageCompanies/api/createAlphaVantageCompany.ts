import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data';
import {
	CreateAlphaVantageCompanyParams,
	AlphaVantageCompany,
	alphaVantageCompaniesApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createAlphaVantageCompany =
	generalizedFirestoreDocumentCreateOperation<
		CreateAlphaVantageCompanyParams,
		AlphaVantageCompany
	>(alphaVantageCompaniesApi as unknown as GeneralizedApiResourceSpec);
