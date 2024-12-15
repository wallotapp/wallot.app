import {
	StripeFinancialConnectionsAccount,
	stripeFinancialConnectionsAccountsApi,
} from '../models/index.js';

describe('StripeFinancialConnectionsAccount', () => {
	test('exampleStripeFinancialConnectionsAccount', () => {
		const { apiResourceDefaultJson } = stripeFinancialConnectionsAccountsApi;
		const exampleStripeFinancialConnectionsAccount: StripeFinancialConnectionsAccount =
			{
				...apiResourceDefaultJson,
				category: 'default',
				name: 'My StripeFinancialConnectionsAccount',
			};
		expect(exampleStripeFinancialConnectionsAccount).toEqual<
			typeof exampleStripeFinancialConnectionsAccount
		>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'stripe_financial_connections_account',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My StripeFinancialConnectionsAccount',
		});
	});
});
