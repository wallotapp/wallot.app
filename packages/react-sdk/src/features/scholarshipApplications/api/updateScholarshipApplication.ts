import { generalizedFirestoreDocumentUpdateOperation } from 'ergonomic-react/src/features/data';
import {
	UpdateScholarshipApplicationParams,
	scholarshipApplicationsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const updateScholarshipApplication =
	generalizedFirestoreDocumentUpdateOperation<UpdateScholarshipApplicationParams>(
		scholarshipApplicationsApi as unknown as GeneralizedApiResourceSpec,
	);
