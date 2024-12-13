import { Model, modelsApi } from '../models/index.js';

describe('Model', () => {
	test('exampleModel', () => {
		const { apiResourceDefaultJson } = modelsApi;
		const exampleModel: Model = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My Model',
		};
		expect(exampleModel).toEqual<typeof exampleModel>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'model',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My Model',
		});
	});
});
