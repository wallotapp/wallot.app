import { Team, teamsApi } from '../models/index.js';

describe('Team', () => {
	test('exampleTeam', () => {
		const { apiResourceDefaultJson } = teamsApi;
		const exampleTeam: Team = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My Team',
		};
		expect(exampleTeam).toEqual<typeof exampleTeam>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'team',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My Team',
		});
	});
});
