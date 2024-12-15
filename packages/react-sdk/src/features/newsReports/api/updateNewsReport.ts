import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreDocumentWrite';
import { UpdateNewsReportParams, getFirestoreCollectionPath } from '@wallot/js';

export const updateNewsReport =
	generalizedFirestoreDocumentUpdateOperation<UpdateNewsReportParams>(
		getFirestoreCollectionPath('news_report'),
	);
