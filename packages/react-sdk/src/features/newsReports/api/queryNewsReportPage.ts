import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import { NewsReport, newsReportsApi } from '@wallot/js';

export const queryNewsReportPage =
	generalizedFirestoreCollectionPageQuery<NewsReport>(
		newsReportsApi as unknown as GeneralizedApiResourceSpec,
	);
