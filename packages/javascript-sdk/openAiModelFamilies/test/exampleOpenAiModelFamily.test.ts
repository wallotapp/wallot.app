import { OpenAiModelFamily, openAiModelFamiliesApi } from '../models/index.js';

describe('OpenAiModelFamily', () => {
	test('exampleOpenAiModelFamily', () => {
		const { apiResourceDefaultJson } = openAiModelFamiliesApi;
		const exampleOpenAiModelFamily: OpenAiModelFamily = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My OpenAiModelFamily',
		};
		expect(exampleOpenAiModelFamily).toEqual<typeof exampleOpenAiModelFamily>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'open_ai_model_family',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My OpenAiModelFamily',
		});
	});
});
