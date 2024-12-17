import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data';
import {
	UpdateAlphaVantageCompanyParams,
	alphaVantageCompaniesApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateAlphaVantageCompany =
	generalizedFirestoreDocumentUpdateOperation<UpdateAlphaVantageCompanyParams>(
		alphaVantageCompaniesApi as unknown as GeneralizedApiResourceSpec,
	);
