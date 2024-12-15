import {
	AlpacaAchRelationship,
	alpacaAchRelationshipsApi,
} from '../models/index.js';

describe('AlpacaAchRelationship', () => {
	test('exampleAlpacaAchRelationship', () => {
		const { apiResourceDefaultJson } = alpacaAchRelationshipsApi;
		const exampleAlpacaAchRelationship: AlpacaAchRelationship = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My AlpacaAchRelationship',
		};
		expect(exampleAlpacaAchRelationship).toEqual<
			typeof exampleAlpacaAchRelationship
		>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'alpaca_ach_relationship',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My AlpacaAchRelationship',
		});
	});
});
