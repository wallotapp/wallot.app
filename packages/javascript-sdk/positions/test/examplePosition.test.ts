import { Position, positionsApi } from '../models/index.js';

describe('Position', () => {
	test('examplePosition', () => {
		const { apiResourceDefaultJson } = positionsApi;
		const examplePosition: Position = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My Position',
		};
		expect(examplePosition).toEqual<typeof examplePosition>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'position',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My Position',
		});
	});
});
