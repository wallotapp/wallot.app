import { Recommendation, recommendationsApi } from '../models/index.js';

describe('Recommendation', () => {
	test('exampleRecommendation', () => {
		const { apiResourceDefaultJson } = recommendationsApi;
		const exampleRecommendation: Recommendation = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My Recommendation',
			best_investments: [],
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
			name: 'My Recommendation',
			best_investments: [],
			investment_product_path: null,
			investment_product_net_gains_after_one_month_path: null,
			model: '',
			news_reports: [],
			open_ai_api_request_ids: [],
			user: '',
		});
	});
});
