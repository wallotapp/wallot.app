import {
	StripeFinancialConnectionAccount,
	stripeFinancialConnectionAccountsApi,
} from '../models/index.js';

describe('StripeFinancialConnectionAccount', () => {
	test('exampleStripeFinancialConnectionAccount', () => {
		const { apiResourceDefaultJson } = stripeFinancialConnectionAccountsApi;
		const exampleStripeFinancialConnectionAccount: StripeFinancialConnectionAccount =
			{
				...apiResourceDefaultJson,
				category: 'default',
				name: 'My StripeFinancialConnectionAccount',
			};
		expect(exampleStripeFinancialConnectionAccount).toEqual<
			typeof exampleStripeFinancialConnectionAccount
		>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'stripe_financial_connection_account',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My StripeFinancialConnectionAccount',
		});
	});
});
