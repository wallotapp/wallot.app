import { StripeCustomer, stripeCustomersApi } from '../models/index.js';

describe('StripeCustomer', () => {
	test('exampleStripeCustomer', () => {
		const { apiResourceDefaultJson } = stripeCustomersApi;
		const exampleStripeCustomer: StripeCustomer = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My StripeCustomer',
			stripe_id: '...',
		};
		expect(exampleStripeCustomer).toEqual<typeof exampleStripeCustomer>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'stripe_customer',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My StripeCustomer',
			stripe_id: '...',
		});
	});
});
