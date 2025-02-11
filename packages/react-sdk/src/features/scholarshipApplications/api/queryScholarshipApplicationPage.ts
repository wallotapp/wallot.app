import { GeneralizedApiResourceSpec } from 'ergonomic';
import { generalizedFirestoreCollectionPageQuery } from 'ergonomic-react/src/features/data';
import { ScholarshipApplication, scholarshipApplicationsApi } from '@wallot/js';

export const queryScholarshipApplicationPage =
	generalizedFirestoreCollectionPageQuery<ScholarshipApplication>(
		scholarshipApplicationsApi as unknown as GeneralizedApiResourceSpec,
	);
