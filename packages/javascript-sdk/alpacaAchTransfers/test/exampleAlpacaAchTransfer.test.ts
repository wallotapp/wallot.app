import { AlpacaAchTransfer, alpacaAchTransfersApi } from '../models/index.js';

describe('AlpacaAchTransfer', () => {
	test('exampleAlpacaAchTransfer', () => {
		const { apiResourceDefaultJson } = alpacaAchTransfersApi;
		const exampleAlpacaAchTransfer: AlpacaAchTransfer = {
			...apiResourceDefaultJson,
			category: 'default',
			name: 'My AlpacaAchTransfer',
		};
		expect(exampleAlpacaAchTransfer).toEqual<typeof exampleAlpacaAchTransfer>({
			_id: expect.any(String),
			_date_last_modified: expect.any(String),
			_created_by: expect.any(String),
			_object: 'alpaca_ach_transfer',
			category: 'default',
			_archived: false,
			_date_created: expect.any(String),
			_deleted: false,
			description: '',
			name: 'My AlpacaAchTransfer',
		});
	});
});
