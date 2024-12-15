import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	UpdateAlphaVantageCompanyParams,
	getFirestoreCollectionPath,
} from '@wallot/js';

export const updateAlphaVantageCompany =
	generalizedFirestoreDocumentUpdateOperation<UpdateAlphaVantageCompanyParams>(
		getFirestoreCollectionPath('alpha_vantage_company'),
	);
