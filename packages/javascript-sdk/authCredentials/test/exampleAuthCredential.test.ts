import { AuthCredential, authCredentialsApi } from '../models/index.js';

describe('AuthCredential', () => {
	test('exampleAuthCredential', () => {
		const { apiResourceDefaultJson } = authCredentialsApi;
		const exampleAuthCredential: AuthCredential = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My AuthCredential',
			user: '',
		};
		expect(exampleAuthCredential).toEqual<typeof exampleAuthCredential>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'auth_credential',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My AuthCredential',
			user: '',
		});
	});
});
