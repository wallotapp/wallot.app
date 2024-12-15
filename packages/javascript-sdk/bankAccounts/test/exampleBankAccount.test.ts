import { BankAccount, bankAccountsApi } from '../models/index.js';

describe('BankAccount', () => {
	test('exampleBankAccount', () => {
		const { apiResourceDefaultJson } = bankAccountsApi;
		const exampleBankAccount: BankAccount = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My BankAccount',
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
		});
	});
});
