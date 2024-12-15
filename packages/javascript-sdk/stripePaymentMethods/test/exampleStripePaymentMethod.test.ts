import {
	StripePaymentMethod,
	stripePaymentMethodsApi,
} from '../models/index.js';

describe('StripePaymentMethod', () => {
	test('exampleStripePaymentMethod', () => {
		const { apiResourceDefaultJson } = stripePaymentMethodsApi;
		const exampleStripePaymentMethod: StripePaymentMethod = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My StripePaymentMethod',
		};
		expect(exampleStripePaymentMethod).toEqual<
			typeof exampleStripePaymentMethod
		>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'stripe_payment_method',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My StripePaymentMethod',
		});
	});
});
