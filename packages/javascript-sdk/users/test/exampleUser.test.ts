import { User, usersApi } from '../models/index.js';

describe('User', () => {
	test('exampleUser', () => {
		const { apiResourceDefaultJson } = usersApi;
		const exampleUser: User = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My User',
			activation_reminder_task_id: '',
			age_range: '1-18',
			alpaca_account_account_number: null,
			alpaca_account_agreements: null,
			alpaca_account_auto_approve: null,
			alpaca_account_contact: null,
			alpaca_account_crypto_status: null,
			alpaca_account_currency: null,
			alpaca_account_disclosures: null,
			alpaca_account_documents: null,
			alpaca_account_enabled_assets: null,
			alpaca_account_id: '',
			alpaca_account_identity: null,
			alpaca_account_kyc_results: null,
			alpaca_account_last_equity: null,
			alpaca_account_minor_identity: null,
			alpaca_account_status: null,
			alpaca_account_trading_configurations: null,
			alpaca_account_trading_type: null,
			alpaca_account_trusted_contact: null,
			capital_level: '10000',
			default_bank_account: '',
			firebase_auth_email: '',
			investing_goals: [],
			parameters: [],
			risk_preference: 'low',
			stripe_customer_id: '',
			username: '',
		};
		expect(exampleUser).toEqual<typeof exampleUser>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'user',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My User',
			activation_reminder_task_id: '',
			age_range: '1-18',
			alpaca_account_account_number: null,
			alpaca_account_agreements: null,
			alpaca_account_auto_approve: null,
			alpaca_account_contact: null,
			alpaca_account_crypto_status: null,
			alpaca_account_currency: null,
			alpaca_account_disclosures: null,
			alpaca_account_documents: null,
			alpaca_account_enabled_assets: null,
			alpaca_account_id: '',
			alpaca_account_identity: null,
			alpaca_account_kyc_results: null,
			alpaca_account_last_equity: null,
			alpaca_account_minor_identity: null,
			alpaca_account_status: null,
			alpaca_account_trading_configurations: null,
			alpaca_account_trading_type: null,
			alpaca_account_trusted_contact: null,
			capital_level: '10000',
			default_bank_account: '',
			firebase_auth_email: '',
			investing_goals: [],
			parameters: [],
			risk_preference: 'low',
			stripe_customer_id: '',
			username: '',
		});
	});
});
