import { ModelFamily, modelFamiliesApi } from '../models/index.js';

describe('ModelFamily', () => {
	test('exampleModelFamily', () => {
		const { apiResourceDefaultJson } = modelFamiliesApi;
		const exampleModelFamily: ModelFamily = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My ModelFamily',
			open_ai_model_family: '',
			user_personas: [],
		};
		expect(exampleModelFamily).toEqual<typeof exampleModelFamily>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'model_family',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My ModelFamily',
			open_ai_model_family: '',
			user_personas: [],
		});
	});
});
