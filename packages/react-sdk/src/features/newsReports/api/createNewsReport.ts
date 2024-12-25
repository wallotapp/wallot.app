import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data';
import { CreateNewsReportParams, NewsReport, newsReportsApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createNewsReport = generalizedFirestoreDocumentCreateOperation<CreateNewsReportParams, NewsReport>(newsReportsApi as unknown as GeneralizedApiResourceSpec);
