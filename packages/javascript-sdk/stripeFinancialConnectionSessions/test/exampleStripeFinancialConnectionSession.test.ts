import {
	StripeFinancialConnectionSession,
	stripeFinancialConnectionSessionsApi,
} from '../models/index.js';

describe('StripeFinancialConnectionSession', () => {
	test('exampleStripeFinancialConnectionSession', () => {
		const { apiResourceDefaultJson } = stripeFinancialConnectionSessionsApi;
		const exampleStripeFinancialConnectionSession: StripeFinancialConnectionSession =
			{
				...apiResourceDefaultJson,
				category: 'default',
				name: 'My StripeFinancialConnectionSession',
				user: '',
			};
		expect(exampleStripeFinancialConnectionSession).toEqual<
			typeof exampleStripeFinancialConnectionSession
		>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'stripe_financial_connection_session',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My StripeFinancialConnectionSession',
			user: '',
		});
	});
});
