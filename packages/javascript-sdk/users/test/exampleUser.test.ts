import { User, usersApi } from '../models/index.js';

describe('User', () => {
	test('exampleUser', () => {
		const { apiResourceDefaultJson } = usersApi;
		const exampleUser: User = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My User',
			age_range: '1-18',
			alpaca_account: '',
			capital_level: '10000',
			investing_goals: [],
			parameters: [],
			risk_preference: 'low',
			stripe_customer: '',
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
			age_range: '1-18',
			alpaca_account: '',
			capital_level: '10000',
			investing_goals: [],
			parameters: [],
			risk_preference: 'low',
			stripe_customer: '',
			username: '',
		});
	});
});
