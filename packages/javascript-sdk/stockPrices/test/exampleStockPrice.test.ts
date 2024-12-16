import { StockPrice, stockPricesApi } from '../models/index.js';

describe('StockPrice', () => {
	test('exampleStockPrice', () => {
		const { apiResourceDefaultJson } = stockPricesApi;
		const exampleStockPrice: StockPrice = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My StockPrice',
			alpha_vantage_stock_price: '',
			stock: '',
		};
		expect(exampleStockPrice).toEqual<typeof exampleStockPrice>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'stock_price',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My StockPrice',
			alpha_vantage_stock_price: '',
			stock: '',
		});
	});
});
