import {
	ScholarshipApplication,
	scholarshipApplicationsApi,
} from '../models/index.js';

describe('ScholarshipApplication', () => {
	test('exampleScholarshipApplication', () => {
		const { apiResourceDefaultJson } = scholarshipApplicationsApi;
		const exampleScholarshipApplication: ScholarshipApplication = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My ScholarshipApplication',
		};
		expect(exampleScholarshipApplication).toEqual<
			typeof exampleScholarshipApplication
		>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'scholarship_application',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My ScholarshipApplication',
		});
	});
});
