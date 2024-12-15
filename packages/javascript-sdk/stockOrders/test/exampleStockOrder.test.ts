import { StockOrder, stockOrdersApi } from '../models/index.js';

describe('StockOrder', () => {
	test('exampleStockOrder', () => {
		const { apiResourceDefaultJson } = stockOrdersApi;
		const exampleStockOrder: StockOrder = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My StockOrder',
		};
		expect(exampleStockOrder).toEqual<typeof exampleStockOrder>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'stock_order',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My StockOrder',
		});
	});
});
