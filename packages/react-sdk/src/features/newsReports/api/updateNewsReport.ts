import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data';
import { UpdateNewsReportParams, newsReportsApi } from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateNewsReport =
	generalizedFirestoreDocumentUpdateOperation<UpdateNewsReportParams>(
		newsReportsApi as unknown as GeneralizedApiResourceSpec,
	);
