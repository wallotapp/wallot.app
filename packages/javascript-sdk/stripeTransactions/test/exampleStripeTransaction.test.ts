import { StripeTransaction, stripeTransactionsApi } from '../models/index.js';

describe('StripeTransaction', () => {
	test('exampleStripeTransaction', () => {
		const { apiResourceDefaultJson } = stripeTransactionsApi;
		const exampleStripeTransaction: StripeTransaction = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My StripeTransaction',
		};
		expect(exampleStripeTransaction).toEqual<typeof exampleStripeTransaction>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'stripe_transaction',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My StripeTransaction',
		});
	});
});
