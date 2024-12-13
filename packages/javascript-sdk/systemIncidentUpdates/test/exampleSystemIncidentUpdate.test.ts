import {
	SystemIncidentUpdate,
	systemIncidentUpdatesApi,
} from '../models/index.js';

describe('SystemIncidentUpdate', () => {
	test('exampleSystemIncidentUpdate', () => {
		const { apiResourceDefaultJson } = systemIncidentUpdatesApi;
		const exampleSystemIncidentUpdate: SystemIncidentUpdate = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My SystemIncidentUpdate',
		};
		expect(exampleSystemIncidentUpdate).toEqual<
			typeof exampleSystemIncidentUpdate
		>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'system_incident_update',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My SystemIncidentUpdate',
		});
	});
});
