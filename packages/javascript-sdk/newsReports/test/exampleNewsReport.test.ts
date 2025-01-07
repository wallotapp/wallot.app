import { NewsReport, newsReportsApi } from '../models/index.js';

describe('NewsReport', () => {
	test('exampleNewsReport', () => {
		const { apiResourceDefaultJson } = newsReportsApi;
		const exampleNewsReport: NewsReport = {
			...apiResourceDefaultJson,
			category: 'company_specific_financial_releases',
			name: 'My NewsReport',
		};
		expect(exampleNewsReport).toEqual<typeof exampleNewsReport>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'news_report',
			category: 'company_specific_financial_releases',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My NewsReport',
		});
	});
});
