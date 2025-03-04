import { Parameter, parametersApi } from '../models/index.js';

describe('Parameter', () => {
	test('exampleParameter', () => {
		const { apiResourceDefaultJson } = parametersApi;
		const exampleParameter: Parameter = {
			...apiResourceDefaultJson,
			category: 'age_range',
			name: 'My Parameter',
			values: [],
		};
		expect(exampleParameter).toEqual<typeof exampleParameter>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'parameter',
			category: 'age_range',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My Parameter',
			values: [],
		});
	});
});
