import {
	OpenAiRecommendation,
	openAiRecommendationsApi,
} from '../models/index.js';

describe('OpenAiRecommendation', () => {
	test('exampleOpenAiRecommendation', () => {
		const { apiResourceDefaultJson } = openAiRecommendationsApi;
		const exampleOpenAiRecommendation: OpenAiRecommendation = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My OpenAiRecommendation',
		};
		expect(exampleOpenAiRecommendation).toEqual<
			typeof exampleOpenAiRecommendation
		>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'open_ai_recommendation',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My OpenAiRecommendation',
		});
	});
});
