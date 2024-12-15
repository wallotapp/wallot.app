import { NewsReport, newsReportsApi } from '../models/index.js';

describe('NewsReport', () => {
	test('exampleNewsReport', () => {
		const { apiResourceDefaultJson } = newsReportsApi;
		const exampleNewsReport: NewsReport = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My NewsReport',
		};
		expect(exampleNewsReport).toEqual<typeof exampleNewsReport>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'news_report',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My NewsReport',
		});
	});
});
