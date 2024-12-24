import { BankAccount, bankAccountsApi } from '../models/index.js';

describe('BankAccount', () => {
	test('exampleBankAccount', () => {
		const { apiResourceDefaultJson } = bankAccountsApi;
		const exampleBankAccount: BankAccount = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My BankAccount',
			account_number_data: '',
			account_number_iv_hex: '',
			alpaca_ach_relationship_id: '',
			alpaca_ach_relationship_status: null,
			institution_name: '',
			last_4: '',
			routing_number: '',
			stripe_financial_connections_account_id: '',
			stripe_payment_method_id: '',
			user: '',
		};
		expect(exampleBankAccount).toEqual<typeof exampleBankAccount>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'bank_account',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My BankAccount',
			account_number_data: '',
			account_number_iv_hex: '',
			alpaca_ach_relationship_id: '',
			alpaca_ach_relationship_status: null,
			institution_name: '',
			last_4: '',
			routing_number: '',
			stripe_financial_connections_account_id: '',
			stripe_payment_method_id: '',
			user: '',
		});
	});
});
