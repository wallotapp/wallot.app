import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import {
	CreateNewsReportParams,
	NewsReport,
	getFirestoreCollectionPath,
	newsReportsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createNewsReport = generalizedFirestoreDocumentCreateOperation<
	CreateNewsReportParams,
	NewsReport
>(
	getFirestoreCollectionPath('news_report'),
	newsReportsApi as unknown as GeneralizedApiResourceSpec,
);
