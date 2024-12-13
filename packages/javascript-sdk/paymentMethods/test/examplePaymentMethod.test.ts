import { PaymentMethod, paymentMethodsApi } from '../models/index.js';

describe('PaymentMethod', () => {
	test('examplePaymentMethod', () => {
		const { apiResourceDefaultJson } = paymentMethodsApi;
		const examplePaymentMethod: PaymentMethod = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My PaymentMethod',
		};
		expect(examplePaymentMethod).toEqual<typeof examplePaymentMethod>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'payment_method',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My PaymentMethod',
		});
	});
});
