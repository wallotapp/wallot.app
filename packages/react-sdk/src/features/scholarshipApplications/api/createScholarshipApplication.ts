import { generalizedFirestoreDocumentCreateOperation } from 'ergonomic-react/src/features/data';
import {
	CreateScholarshipApplicationParams,
	ScholarshipApplication,
	scholarshipApplicationsApi,
} from '@wallot/js';
import { GeneralizedApiResourceSpec } from 'ergonomic';

export const createScholarshipApplication =
	generalizedFirestoreDocumentCreateOperation<
		CreateScholarshipApplicationParams,
		ScholarshipApplication
	>(scholarshipApplicationsApi as unknown as GeneralizedApiResourceSpec);
