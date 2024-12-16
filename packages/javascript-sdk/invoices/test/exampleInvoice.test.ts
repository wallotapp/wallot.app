import { Invoice, invoicesApi } from '../models/index.js';

describe('Invoice', () => {
	test('exampleInvoice', () => {
		const { apiResourceDefaultJson } = invoicesApi;
		const exampleInvoice: Invoice = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My Invoice',
			license: '',
			payment_method: '',
			stripe_invoice: '',
		};
		expect(exampleInvoice).toEqual<typeof exampleInvoice>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'invoice',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My Invoice',
			license: '',
			payment_method: '',
			stripe_invoice: '',
		});
	});
});
