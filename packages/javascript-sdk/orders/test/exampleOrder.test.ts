import { Order, ordersApi } from '../models/index.js';

describe('Order', () => {
	test('exampleOrder', () => {
		const { apiResourceDefaultJson } = ordersApi;
		const exampleOrder: Order = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My Order',
		};
		expect(exampleOrder).toEqual<typeof exampleOrder>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'order',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My Order',
		});
	});
});
