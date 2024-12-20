import { Stock, stocksApi } from '../models/index.js';

describe('Stock', () => {
	test('exampleStock', () => {
		const { apiResourceDefaultJson } = stocksApi;
		const exampleStock: Stock = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My Stock',
		};
		expect(exampleStock).toEqual<typeof exampleStock>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'stock',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My Stock',
		});
	});
});
