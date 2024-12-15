import { AlpacaPosition, alpacaPositionsApi } from '../models/index.js';

describe('AlpacaPosition', () => {
	test('exampleAlpacaPosition', () => {
		const { apiResourceDefaultJson } = alpacaPositionsApi;
		const exampleAlpacaPosition: AlpacaPosition = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My AlpacaPosition',
		};
		expect(exampleAlpacaPosition).toEqual<typeof exampleAlpacaPosition>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'alpaca_position',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My AlpacaPosition',
		});
	});
});
