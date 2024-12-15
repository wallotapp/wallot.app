import { AlpacaOrder, alpacaOrdersApi } from '../models/index.js';

describe('AlpacaOrder', () => {
	test('exampleAlpacaOrder', () => {
		const { apiResourceDefaultJson } = alpacaOrdersApi;
		const exampleAlpacaOrder: AlpacaOrder = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My AlpacaOrder',
		};
		expect(exampleAlpacaOrder).toEqual<typeof exampleAlpacaOrder>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'alpaca_order',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My AlpacaOrder',
		});
	});
});
