import { OpenAiModel, openAiModelsApi } from '../models/index.js';

describe('OpenAiModel', () => {
	test('exampleOpenAiModel', () => {
		const { apiResourceDefaultJson } = openAiModelsApi;
		const exampleOpenAiModel: OpenAiModel = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My OpenAiModel',
		};
		expect(exampleOpenAiModel).toEqual<typeof exampleOpenAiModel>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'open_ai_model',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My OpenAiModel',
		});
	});
});
