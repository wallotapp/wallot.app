import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import {
	NewsReport,
	getFirestoreCollectionPath,
	newsReportsApi,
} from '@wallot/js';

export const queryNewsReportPage =
	generalizedFirestoreCollectionPageQuery<NewsReport>(
		getFirestoreCollectionPath('news_report'),
		newsReportsApi as unknown as GeneralizedApiResourceSpec,
	);
