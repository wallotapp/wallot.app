import { SystemIncident, systemIncidentsApi } from '../models/index.js';

describe('SystemIncident', () => {
	test('exampleSystemIncident', () => {
		const { apiResourceDefaultJson } = systemIncidentsApi;
		const exampleSystemIncident: SystemIncident = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My SystemIncident',
		};
		expect(exampleSystemIncident).toEqual<typeof exampleSystemIncident>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'system_incident',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My SystemIncident',
		});
	});
});
