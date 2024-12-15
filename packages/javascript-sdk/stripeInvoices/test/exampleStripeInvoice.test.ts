import { StripeInvoice, stripeInvoicesApi } from '../models/index.js';

describe('StripeInvoice', () => {
	test('exampleStripeInvoice', () => {
		const { apiResourceDefaultJson } = stripeInvoicesApi;
		const exampleStripeInvoice: StripeInvoice = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My StripeInvoice',
		};
		expect(exampleStripeInvoice).toEqual<typeof exampleStripeInvoice>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'stripe_invoice',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My StripeInvoice',
		});
	});
});
