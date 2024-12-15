import { UserPersona, userPersonasApi } from '../models/index.js';

describe('UserPersona', () => {
	test('exampleUserPersona', () => {
		const { apiResourceDefaultJson } = userPersonasApi;
		const exampleUserPersona: UserPersona = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My UserPersona',
		};
		expect(exampleUserPersona).toEqual<typeof exampleUserPersona>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'user_persona',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My UserPersona',
		});
	});
});
