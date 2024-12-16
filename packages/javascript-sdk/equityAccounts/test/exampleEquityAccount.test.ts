import { EquityAccount, equityAccountsApi } from '../models/index.js';

describe('EquityAccount', () => {
	test('exampleEquityAccount', () => {
		const { apiResourceDefaultJson } = equityAccountsApi;
		const exampleEquityAccount: EquityAccount = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My EquityAccount',
			user: '',
		};
		expect(exampleEquityAccount).toEqual<typeof exampleEquityAccount>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'equity_account',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My EquityAccount',
			user: '',
		});
	});
});
