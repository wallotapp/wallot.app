import { AlpacaAccount, alpacaAccountsApi } from '../models/index.js';

describe('AlpacaAccount', () => {
	test('exampleAlpacaAccount', () => {
		const { apiResourceDefaultJson } = alpacaAccountsApi;
		const exampleAlpacaAccount: AlpacaAccount = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My AlpacaAccount',
		};
		expect(exampleAlpacaAccount).toEqual<typeof exampleAlpacaAccount>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'alpaca_account',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My AlpacaAccount',
		});
	});
});
