import {
	AlphaVantageStockPrice,
	alphaVantageStockPricesApi,
} from '../models/index.js';

describe('AlphaVantageStockPrice', () => {
	test('exampleAlphaVantageStockPrice', () => {
		const { apiResourceDefaultJson } = alphaVantageStockPricesApi;
		const exampleAlphaVantageStockPrice: AlphaVantageStockPrice = {
			...apiResourceDefaultJson,
			category: 'daily',
			name: 'My AlphaVantageStockPrice',
		};
		expect(exampleAlphaVantageStockPrice).toEqual<
			typeof exampleAlphaVantageStockPrice
		>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'alpha_vantage_stock_price',
			category: 'daily',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My AlphaVantageStockPrice',
		});
	});
});
