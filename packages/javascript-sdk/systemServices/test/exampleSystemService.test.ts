import { SystemService, systemServicesApi } from '../models/index.js';

describe('SystemService', () => {
	test('exampleSystemService', () => {
		const { apiResourceDefaultJson } = systemServicesApi;
		const exampleSystemService: SystemService = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My SystemService',
		};
		expect(exampleSystemService).toEqual<typeof exampleSystemService>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'system_service',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My SystemService',
		});
	});
});
