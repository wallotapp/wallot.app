import { Recommendation, recommendationsApi } from '../models/index.js';

describe('Recommendation', () => {
	test('exampleRecommendation', () => {
		const { apiResourceDefaultJson } = recommendationsApi;
		const exampleRecommendation: Recommendation = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My Recommendation',
			asset_prices: [],
			model: '',
			news_reports: [],
			open_ai_api_request_ids: [],
			user: '',
		};
		expect(exampleRecommendation).toEqual<typeof exampleRecommendation>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'recommendation',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			asset_prices: [],
			name: 'My Recommendation',
			model: '',
			news_reports: [],
			open_ai_api_request_ids: [],
			user: '',
		});
	});
});
