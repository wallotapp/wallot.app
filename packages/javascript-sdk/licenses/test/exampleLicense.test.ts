import { License, licensesApi } from '../models/index.js';

describe('License', () => {
	test('exampleLicense', () => {
		const { apiResourceDefaultJson } = licensesApi;
		const exampleLicense: License = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My License',
		};
		expect(exampleLicense).toEqual<typeof exampleLicense>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'license',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My License',
		});
	});
});
