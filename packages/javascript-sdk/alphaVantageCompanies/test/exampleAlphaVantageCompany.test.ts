import {
	AlphaVantageCompany,
	alphaVantageCompaniesApi,
} from '../models/index.js';

describe('AlphaVantageCompany', () => {
	test('exampleAlphaVantageCompany', () => {
		const { apiResourceDefaultJson } = alphaVantageCompaniesApi;
		const exampleAlphaVantageCompany: AlphaVantageCompany = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My AlphaVantageCompany',
		};
		expect(exampleAlphaVantageCompany).toEqual<
			typeof exampleAlphaVantageCompany
		>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'alpha_vantage_company',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My AlphaVantageCompany',
		});
	});
});
